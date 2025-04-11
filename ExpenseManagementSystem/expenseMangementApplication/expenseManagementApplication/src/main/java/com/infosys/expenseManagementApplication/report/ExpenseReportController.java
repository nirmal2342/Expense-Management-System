package com.infosys.expenseManagementApplication.report;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infosys.expenseManagementApplication.bean.Customer;
import com.infosys.expenseManagementApplication.bean.Expense;
import com.infosys.expenseManagementApplication.dao.customer.CustomerDao;

import jakarta.mail.MessagingException;
import java.util.Map;

@RestController
@RequestMapping("/exp-mng/expense-report/")
@CrossOrigin(origins = "http://localhost:5656") 
public class ExpenseReportController {

	@Autowired
	private ExpenseReportService expenseReportService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private ExpenseService expenseService;
	
	@Autowired
	private CustomerDao customerDao;

	@PostMapping("/view")
	public ResponseEntity<byte[]> viewExpenseReport(@RequestBody Map<String, String> requestData) { 

		String customerId = requestData.get("customerId");
		if (customerId == null || customerId.isEmpty()) {
			return ResponseEntity.badRequest().build();
		}

		List<Expense> expenses = expenseService.getExpensesByCustomerId(customerId);
		if (expenses.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.header(HttpHeaders.WARNING, "No expenses found for this customer.")
					.build();
		}
		try {
			byte[] pdfReport = expenseReportService.generateExpenseReport(expenses);
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ExpenseReport.pdf")
					.contentType(MediaType.APPLICATION_PDF)
					.body(pdfReport);

		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	@PostMapping("/send-email")
	public String sendExpenseReport(@RequestBody Map<String, String> requestData) { 

		String recipientEmail = requestData.get("email");
		String customerId = requestData.get("customerId"); 
		if (recipientEmail == null || recipientEmail.isEmpty()) {
			return "Error: Email address is required.";
		}
		if (customerId == null || customerId.isEmpty()) {
			return "Error: Customer ID is missing.";
		}
		
		Customer customer = customerDao.getCustomerById(customerId);
		if (customer == null) {
	        return "Error: Customer not found.";
	    }

		List<Expense> expenses = expenseService.getExpensesByCustomerId(customerId);
		if (expenses.isEmpty()) {
			return "No expenses found for this customer.";
		}
		try {
			byte[] pdfReport = expenseReportService.generateExpenseReport(expenses);
			emailService.sendExpenseReportEmail(recipientEmail, pdfReport,customer.getUsername());
			
			return "Expense report emailed successfully to " + recipientEmail + "!";
		} catch (IOException | MessagingException e) {
			e.printStackTrace();
			return "Error sending email: " + e.getMessage();
		}
	}
}

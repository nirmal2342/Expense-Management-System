package com.infosys.expenseManagementApplication.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.expenseManagementApplication.bean.Customer;
import com.infosys.expenseManagementApplication.bean.CustomerExpense;
import com.infosys.expenseManagementApplication.bean.Expense;
import com.infosys.expenseManagementApplication.dao.customer.CustomerDao;
import com.infosys.expenseManagementApplication.dao.expense.ExpenseDao;
import com.infosys.expenseManagementApplication.service.CustomerExpenseService;
import com.infosys.expenseManagementApplication.service.ExpenseUserService;

@RestController
@RequestMapping("/exp-mng/")
@CrossOrigin(origins = "http://localhost:5656")
public class ExpenseController {
	
	@Autowired
	private ExpenseDao expenseDao;
	
	@Autowired
	private ExpenseUserService service;
	
	@Autowired
	private CustomerDao customerDao;
	
	@Autowired
	private CustomerExpenseService customerService;
	
	@PostMapping("/expense")//
	public void saveExpense(@RequestBody Expense expense){
		expenseDao.save(expense);
	}
	
	@PutMapping("/expense")//
	public void updateExpense(@RequestBody Expense expense){
		expenseDao.save(expense);
	}
	
	@GetMapping("/expense")//
	public List<Expense> getAllExpenses(){
		return expenseDao.getAllExpenses();
	}
	
	@GetMapping("/expense/{id}")//
	public Expense getExpenseById(@PathVariable String id){
		return expenseDao.getExpenseById(id);
	}
	
	@DeleteMapping("/expense/{id}")//
	public void deleteExpenseById(@PathVariable String id){
		 expenseDao.deleteExpenseById(id);
	}

	@GetMapping("/expense-category")//
	public List<Expense> getExpenseByCategory(Long categoryId){
		return expenseDao.getExpenseByCategory(categoryId);
		
	}
	
	@GetMapping("/expense-customer")//
	public List<Expense> getExpenseByCustomer(){
		try {
		String userId=service.getUserId();
		//System.out.println("Userid"+userId);
		if (userId == null) {
            System.out.println("No expense found for the user.");
            return Collections.emptyList(); // Return an empty list
        }
		
		Customer customer=customerDao.getCustomerByUsername(userId);
		String customerId=customer.getCustomerId();
		return expenseDao.getExpenseByCustomer(customerId);
		}catch(Exception e){
			return Collections.emptyList();
			
		}
		
	}
	
	@GetMapping("/expense-customer/{id}")//
	public List<Expense> getExpenseByCustomer(@PathVariable String id){
		return expenseDao.getExpenseByCustomer(id);
		
	}
	
	@GetMapping("/expense-id")//
	public String generateExpenseById(){
		return expenseDao.generateExpenseById();
	}
	
	@GetMapping("/report")
	public List<CustomerExpense> getCustomerExpenseById() {
//	    String userId = service.getUserId();
//	    Customer customer = customerDao.getCustomerByUsername(userId);
//	    String customerId = customer.getCustomerId();
//	    return customerService.getCategorywiseCustomerExpense(customerId);
		try {
	        String userId = service.getUserId();
	        Customer customer = customerDao.getCustomerByUsername(userId);

	        if (customer == null) {
	            System.out.println("Customer Data not found for user ID: " + userId); 
	            return Collections.emptyList(); 
	        }

	        String customerId = customer.getCustomerId();
	        return customerService.getCategorywiseCustomerExpense(customerId);
	    } catch (Exception e) {
	        System.out.println("An error occurred: " + e.getMessage()); 
	        return Collections.emptyList(); 
	    }
	}

	@GetMapping("/report/{id}")
	public List<CustomerExpense> getCustomerExpenseById(@PathVariable String id) {
	    return customerService.getCategorywiseCustomerExpense(id);
	}
	
}

package com.infosys.expenseManagementApplication.report;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.expenseManagementApplication.bean.Category;
import com.infosys.expenseManagementApplication.bean.Expense;
import com.infosys.expenseManagementApplication.dao.category.CategoryRepository;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

@Service
public class ExpenseReportService {

	@Autowired
	private CategoryRepository categoryRepository;

	public byte[] generateExpenseReport(List<Expense> expenses) throws IOException {
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		PdfWriter writer = new PdfWriter(outputStream);
		PdfDocument pdfDoc = new PdfDocument(writer);
		Document document = new Document(pdfDoc);

		// Title
		document.add(new Paragraph("Expense Report").setTextAlignment(TextAlignment.CENTER).setBold());
		if (expenses.isEmpty()) {
			document.add(new Paragraph("No expenses found."));
		} else {
			document.add(createExpenseTable(expenses));
		}

		document.close();
		return outputStream.toByteArray();
	}

	public Table createExpenseTable(List<Expense> expenses) {
		Table table = new Table(UnitValue.createPercentArray(new float[]{2, 2, 3, 2, 2, 3})).useAllAvailableWidth();
		String[] headers = {"Expense Id", "Customer Id", "Category Name", "Expense Date", "Expense Amount", "Description"};

		for (String header : headers) {
			table.addHeaderCell(new Cell().add(new Paragraph(header))
					.setBackgroundColor(ColorConstants.BLUE).setFontColor(ColorConstants.WHITE));
		}

		double totalExpense = 0;
		for (Expense expense : expenses) {
			String categoryName = categoryRepository.findById(expense.getCategoryId())
					.map(Category::getCategoryName).orElse("Unknown");

			table.addCell(expense.getExpenseId());
			table.addCell(expense.getCustomerId());
			table.addCell(categoryName);
			table.addCell(expense.getExpenseDate().toString());
			table.addCell(String.format("%.2f", expense.getAmount()));
			table.addCell(expense.getDescription());

			totalExpense += expense.getAmount();
		}

		table.addCell(new Cell(1, 4).add(new Paragraph("Total Spend:").setBold()));
		table.addCell(new Cell().add(new Paragraph(String.format("%.2f Rs.", totalExpense)).setBold()));
		table.addCell(new Cell());

		return table;
	}
}

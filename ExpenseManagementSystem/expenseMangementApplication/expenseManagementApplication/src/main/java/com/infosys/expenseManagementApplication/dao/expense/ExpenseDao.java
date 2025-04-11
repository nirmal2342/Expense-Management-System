package com.infosys.expenseManagementApplication.dao.expense;

import java.util.List;

import com.infosys.expenseManagementApplication.bean.Expense;

public interface ExpenseDao {

	public void save(Expense expense);
	public String generateExpenseById();
	public Expense getExpenseById(String id);
	public void deleteExpenseById(String id);
	public List<Expense> getAllExpenses();
	public List<Expense> getExpenseByCategory(Long categoryId);
	public List<Expense> getExpenseByCustomer(String customerId);
	
}

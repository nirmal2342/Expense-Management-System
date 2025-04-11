package com.infosys.expenseManagementApplication.dao.expense;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.expenseManagementApplication.bean.Expense;

@Service
@Repository
public class ExpenseDaoImpl implements ExpenseDao {

	@Autowired
	private ExpenseRepository repo;
	
	@Override
	public void save(Expense expense) {
		repo.save(expense);
	}

	@Override
	public String generateExpenseById() {
		Long id=0L;
	    String val = repo.getMaxExpenseId();
	    if (val == null) {
	        id = 100001L;
	    } else {
	        id = Long.parseLong(val.substring(2)); // Extract number part after "E"
	        id++;
	    }

	    return "EX" + id;
	}

	@Override
	public Expense getExpenseById(String expenseId) {
		return repo.findById(expenseId).get();
	}

	@Override
	public List<Expense> getAllExpenses() {
		return repo.findAll();
	}

	@Override
	public void deleteExpenseById(String expenseId) {
		repo.deleteById(expenseId);
	}

	@Override
	public List<Expense> getExpenseByCategory(Long categoryId) {
		return repo.getExpensesByCategory(categoryId);
	}

	@Override
	public List<Expense> getExpenseByCustomer(String customerId) {
		return repo.getExpensesByCustomer(customerId);
	}


}

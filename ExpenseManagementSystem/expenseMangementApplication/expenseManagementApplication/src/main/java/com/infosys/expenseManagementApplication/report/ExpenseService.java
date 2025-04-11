package com.infosys.expenseManagementApplication.report;

import com.infosys.expenseManagementApplication.bean.Expense;
import com.infosys.expenseManagementApplication.bean.Customer;
import com.infosys.expenseManagementApplication.dao.expense.ExpenseDao;
import com.infosys.expenseManagementApplication.dao.customer.CustomerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseDao expenseDao;

    public List<Expense> getExpensesByCustomerId(String customerId) {
        return expenseDao.getExpenseByCustomer(customerId);
    }
}

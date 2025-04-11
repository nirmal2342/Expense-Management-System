package com.infosys.expenseManagementApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.expenseManagementApplication.bean.ExpenseUser;

public interface ExpenseUserRepository extends JpaRepository<ExpenseUser, String> {

}

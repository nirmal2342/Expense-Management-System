package com.infosys.expenseManagementApplication.bean;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Expense {
	@Id
	private String expenseId;//Auto Generated
	
	private String customerId;//Auto Assigned
	private Long categoryId;//Auto Assigned
	
	private String expenseDate;//Date Picker
	private Double amount;
	private String description;
	
	public Expense() {
		super();
	}

	public Expense(String expenseId, String customerId, Long categoryId, String expenseDate, Double amount,
			String description) {
		super();
		this.expenseId = expenseId;
		this.customerId = customerId;
		this.categoryId = categoryId;
		this.expenseDate = expenseDate;
		this.amount = amount;
		this.description = description;
	}

	public String getExpenseId() {
		return expenseId;
	}

	public void setExpenseId(String expenseId) {
		this.expenseId = expenseId;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public String getExpenseDate() {
		return expenseDate;
	}

	public void setExpenseDate(String expenseDate) {
		this.expenseDate = expenseDate;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Expense [expenseId=" + expenseId + ", customerId=" + customerId + ", categoryId=" + categoryId
				+ ", expenseDate=" + expenseDate + ", amount=" + amount + ", description=" + description + "]";
	}
	
	
	

}

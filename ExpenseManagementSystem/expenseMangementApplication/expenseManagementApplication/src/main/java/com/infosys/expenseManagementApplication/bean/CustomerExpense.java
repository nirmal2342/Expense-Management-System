package com.infosys.expenseManagementApplication.bean;

public class CustomerExpense {

	private Long categoryId;
	private Double amount;
	
	public CustomerExpense() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CustomerExpense(Long categoryId, Double amount) {
		super();
		this.categoryId = categoryId;
		this.amount = amount;
	}
	public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	
}

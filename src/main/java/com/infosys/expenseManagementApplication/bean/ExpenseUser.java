package com.infosys.expenseManagementApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ExpenseUser {
	
	@Id
	private String username;
	private String password;
	private String category;
	private String email;
	
	public ExpenseUser() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ExpenseUser(String username, String password, String category, String email) {
		super();
		this.username = username;
		this.password = password;
		this.category = category;
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
	

}

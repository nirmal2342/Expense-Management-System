package com.infosys.expenseManagementApplication.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.infosys.expenseManagementApplication.bean.ExpenseUser;
import com.infosys.expenseManagementApplication.dao.ExpenseUserRepository;

@Service
public class ExpenseUserService implements UserDetailsService{
	@Autowired
	private ExpenseUserRepository repository;
	
	private String userId,category,email,customerId;
	
	public void save(ExpenseUser user) {
		repository.save(user);
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		ExpenseUser user=repository.findById(username).get();
		this.userId=user.getUsername();
		this.category=user.getCategory();
		this.email=user.getEmail();
		this.customerId = user.getCustomerId();
		return user;
	}

	public String getUserId() {
		return userId;
	}
	
	public String getCategory() {
		return category;
	}

	public String getEmail() {
		return email;
	}
	
	public String getCustomerId() { // Getter for customerId
		return customerId;
	}

	
	
}
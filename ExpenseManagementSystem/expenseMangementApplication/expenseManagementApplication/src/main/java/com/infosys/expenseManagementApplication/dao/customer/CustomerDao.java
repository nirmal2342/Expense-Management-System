package com.infosys.expenseManagementApplication.dao.customer;

import java.util.List;

import com.infosys.expenseManagementApplication.bean.Category;
import com.infosys.expenseManagementApplication.bean.Customer;

public interface CustomerDao {
	public void save(Customer customer);
	public Customer getCustomerById(String id);
	//public void deleteCustomerById(String id);
	public List<Customer> getAllCustomers();
	public String generateCustomerById();
	public List<Customer> getCurrentCustomers();
	public String getCustomerStatusByUsername(String username);
	public Customer getCustomerByUsername(String username);
	public Customer getCustomerByEmail(String email);
	
	
	

}

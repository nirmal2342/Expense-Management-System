package com.infosys.expenseManagementApplication.dao.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.expenseManagementApplication.bean.Customer;

@Service
@Repository
public class CustomerDaoImpl implements CustomerDao {
	
	@Autowired
	private CustomerRepository repo;
	
	@Override
	public void save(Customer customer) {
		repo.save(customer);
	}

	@Override
	public Customer getCustomerById(String id) {
	//System.out.println("Fetching customer with ID: " + id);
		return repo.findById(id).get();
	}

//	@Override
//	public void deleteCustomerById(String id) {
//		repo.deleteById(id);
//	}

	@Override
	public List<Customer> getAllCustomers() {
		return repo.findAll();
	}

	@Override
	public String generateCustomerById() {
	    Long id=0L;
	    String val = repo.getMaxCustomerId();
	    //System.out.println(val);
	    if (val == null) {
	        id = 100001L;
	    } else {
	        id = Long.parseLong(val.substring(1)); // Extract number part after "C"
	        id++;
	    }

	    return "C" + id;
	}


	@Override
	public Customer getCustomerByUsername(String username) {
		return repo.getCustomerByUsername(username);
	}
	
	@Override
	public String getCustomerStatusByUsername(String username) {
		return repo.getCustomerStatusByUsername(username);
	}

	@Override
	public List<Customer> getCurrentCustomers() {
		return repo.getCurrentCustomers();
	}

	@Override
	public Customer getCustomerByEmail(String email) {
		
		return repo.getCustomerIdByEmail(email);
	}

//	@Override
//	public Customer getCustomerByEmail(String email) {
//		return repo.getCustomerIdByEmail(email);
//	}

}

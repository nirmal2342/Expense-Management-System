package com.infosys.expenseManagementApplication.dao.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.expenseManagementApplication.bean.Category;

@Service
@Repository
public class CategoryDaoImpl implements CategoryDao {
	
	@Autowired
	private CategoryRepository repository;
	
	@Override
	public void save(Category category) {
		repository.save(category);
	}

	@Override
	public Category getCategoryById(Long id) {
		return repository.findById(id).get();
	}

	@Override
	public void deleteCategoryById(Long id) {
		repository.deleteById(id);
	}

	@Override
	public List<Category> getAllCategories() {
		return repository.findAll();
	}

	@Override
	public Long generateCategoryById() {
		Long id=repository.getMaxCategoryId();
		if(id==null) {
			id=1001L;
		}else {
			id++;
		}
		return id;
	}

	@Override
	public Category getCategoryByName(String categoryName) {
		return repository.getCategoryByName(categoryName);
	}

}

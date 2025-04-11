package com.infosys.expenseManagementApplication.dao.category;

import java.util.List;

import com.infosys.expenseManagementApplication.bean.Category;

public interface CategoryDao {
	public void save(Category category);
	public Category getCategoryById(Long id);
	public void deleteCategoryById(Long id);
	public List<Category> getAllCategories();
	public Long generateCategoryById();
	public Category getCategoryByName(String categoryName);
	

}

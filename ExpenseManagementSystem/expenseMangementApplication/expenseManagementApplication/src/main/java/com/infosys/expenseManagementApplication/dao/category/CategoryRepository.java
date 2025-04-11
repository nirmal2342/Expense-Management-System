package com.infosys.expenseManagementApplication.dao.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.infosys.expenseManagementApplication.bean.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	@Query("select max(categoryId)from Category")
	public Long getMaxCategoryId();
	
	@Query("select a from Category a where a.categoryName=?1")
	public Category getCategoryByName(String categoryName);

}

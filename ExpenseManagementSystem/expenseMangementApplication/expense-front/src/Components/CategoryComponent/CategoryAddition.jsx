import React,{useState,useEffect} from "react";
import {generateCategoryId,saveCategory} from '../../Services/CategoryService';
import { useNavigate } from "react-router-dom";
import '../../LoginView.css';

const CategoryAddition=()=>{

    const [category,setCategory]=useState ({
        categoryId:0,
	    categoryName:"",
	    description:""

    });
    const [newId,setNewId]=useState(0);
    const [errors, setErrors] = useState({});
    let navigate=useNavigate();

    const setCategoryId = () => {
        generateCategoryId().then((response) => {
            setNewId(response.data);
        });
    }
    

    useEffect(() => {
        setCategoryId()
   }, []);

   const returnBack=()=>{
    navigate('/AdminMenu'); 
   };
    

const  onChangeHandler = (event) =>{
    event.persist();
    const name = event.target.name;
        const value = event.target.value;
       setCategory(values =>({...values, [name]: value }));
     };

     const validateForm = () => {
        let formErrors = {};
        if (!category.categoryName.trim()) {
          formErrors.categoryName = "Category Name is required!";
        }
        if (!category.description.trim()) {
          formErrors.description = "Category Description is required!";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; 
      };

     const categorySave=(event)=>{
        event.preventDefault();
        if (!validateForm()) return; 
        category.categoryId=newId;
           saveCategory(category).then((response)=>{
                   alert("New Category is added");
                   navigate('/AdminMenu');    
                 });

                 
       };

return (
  <div className="login-page">
      <div className="login-container">
          <div className="card-body">
              <h2 className="text-center updateCustomer "><u>Category Addition</u></h2>
              <br/>
              <form>
                  <div className="form-group">
                      <label className="styled-label">Category Id: </label>
                      <input placeholder="Category Id" name="categoryId" className="form-control" value={newId} readOnly />
                  </div>
                  <div className="form-group">
                      <label className="styled-label">Category Name: </label>
                      <input placeholder="Category Name" name="categoryName"  className="form-control" value={category.categoryName} onChange={onChangeHandler} />
                        {errors.categoryName && ( <p style={{ color: "red", fontSize: "14px" }}>{errors.categoryName}</p>)}
                  </div>
                  <div className="form-group">
                      <label className="styled-label">Category Description: </label>
                      <input placeholder="Category Description" name="description" className="form-control" value={category.description} onChange={onChangeHandler} />
                        {errors.description && ( <p style={{ color: "red", fontSize: "14px" }}>{errors.description}</p>)}
                  </div>
                  <button type="submit" className="btn-submit w-100 mt-3"onClick={categorySave}>Save</button> 
                  <button type="button" className="btn-submit w-100 mt-3" onClick={returnBack}>Return</button>    
              </form>
          </div>
      </div>
  </div>
);

};
export default CategoryAddition;

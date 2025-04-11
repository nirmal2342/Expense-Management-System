import React,{useState,useEffect} from "react";
import {displayCategoryById,updateCategory} from '../../Services/CategoryService';
import { useNavigate ,useParams } from "react-router-dom";
import '../../LoginView.css';

const UpdateCategory = () => {
    const [category, setCategory] = useState({
        categoryId: 0,
        categoryName: "",
        description: ""
    });

    let navigate = useNavigate();
    const { id } = useParams(); 
    const returnBack=()=>{
        navigate('/admin-category-list'); 
       };

    useEffect(() => {
        displayCategoryById(id).then((response) => {
            setCategory(response.data);
        });
    }, [id]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCategory((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const categoryUpdate = (event) => {
        event.preventDefault();
        updateCategory(category).then(() => {
            alert("Category updated successfully");
            navigate('/admin-category-list');
        });
    };

   
    return (
     
        <div className="login-page" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className=" p-4 shadow" style={{ width: "400px", borderRadius: "10px" }}>
                <div className="login-container">
                    <h2 className="text-center updateCustomer "><u>Update Category</u></h2>
                    <br />
                    <form>
                        <div className="form-group">
                            <label className="styled-label">Category Id: </label>
                            <input name="categoryId" className="form-control" value={category.categoryId} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Category Name: </label>
                            <input placeholder="Category Name" name="categoryName" className="form-control" value={category.categoryName} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Category Description: </label>
                            <input placeholder="Category Description" name="description" className="form-control" value={category.description} onChange={onChangeHandler} />
                        </div>
                        <button type="submit" className="btn-submit w-100 mt-3" onClick={returnBack}>Return</button>    
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;
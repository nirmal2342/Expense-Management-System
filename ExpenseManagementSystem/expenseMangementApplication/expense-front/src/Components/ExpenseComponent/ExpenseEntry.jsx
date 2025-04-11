import React, { useState, useEffect } from "react";
import { saveExpense,generateExpenseById } from '../../Services/ExpenseService';
import { getCustomerByUsername,getCustomerStatusByUsername } from '../../Services/CustomerService';
import {displayAllCategories} from '../../Services/CategoryService';
import { useNavigate } from "react-router-dom";
import '../../LoginView.css';

const ExpenseEntry = () => {

    const [expense, setExpense] = useState({
        expenseId: "",
        customerId :"",
        categoryId: "",
        expenseDate: "",
        amount:"",
        description: "",

    });
    const [customer,setCustomer]=useState({
        customerId:"",
    });
     const [categories,setCategories]=useState([]);
     const [newId, setNewId] = useState("");
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

     const setCustomerData=()=>{
        getCustomerByUsername().then((response) => {
         // console.log("Customer data:", response.data.customerId);
          
        if(!response.data){
            alert("Please Complete Your Customer Registration.");
            navigate('/CustomerMenu'); 
            
        }else{
            setCustomer(response.data);
        }
            
        });

    };

    const setCategoryData=()=>{
        
            displayAllCategories().then((response) => {
                        setCategories(response.data);
                    });
    
        };
 
    const setExpenseId = () => {
       
        generateExpenseById().then((response) => {
            setNewId(response.data);
        });
    };
    const checkStatus = () => {
        
            getCustomerStatusByUsername().then(response => {
                //console.log(response.data);
                if (response.data ===  false) {
                    alert("Customer is inactive. Please activate the account.");
                    navigate('/CustomerMenu'); 
                } else {
                    setExpenseId();
                }
            });
        };

    useEffect(() => {
        checkStatus();
        setCustomerData();
        setCategoryData();
    }, []);

    const returnBack=()=>{
       
         navigate('/CustomerMenu'); 
        }


    const onChangeHandler = (event) => {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;
        setExpense(values => ({ ...values, [name]: value }));
    };

    const expenseSave = (event) => {
        event.preventDefault();
       if (!validateForm()) return; // Stop submission if validation fails
    const updatedExpense = {
        ...expense,
        expenseId: newId,
        customerId: customer.customerId  
    };

   
        expense.expenseId = newId;
        saveExpense(updatedExpense).then((response) => {
            alert("New Expense is added");
            navigate('/CustomerMenu');
        });
        
    };

    const validateForm = () => {
        let formErrors = {};
        if (!expense.categoryId.trim()) {
            formErrors.categoryId = "Category is required!";
        }
        if (!expense.expenseDate.trim()) {
            formErrors.expenseDate = "Expense Date is required!";
        }
        if (!expense.amount.trim()) {
            formErrors.amount = "Expense Amount is required!";
        }
        if (!expense.description.trim()) {
            formErrors.description = "Expense Description is required!";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; // Returns true if no errors
    };

    

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="card-body">
                    <h2 className="text-center updateCustomer"><u>Expense Entry</u></h2>
                    <br />
                    <form>
                        <div className="form-group">
                            <label className="styled-label">Expense Id: </label>
                            <input placeholder="Expense Id" name="expenseId" className="form-control" value={newId} readOnly/>
                        </div>
                        <div className="form-group">
                            <label className="styled-label"> Customer Id: </label>
                            <input placeholder="Customer Id" name="customerId" className="form-control" value={customer.customerId} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Category Name: </label>
                            <select name="categoryId" className="form-control" value={expense.categoryId} onChange={onChangeHandler}>
                                <option value="">Select a Category</option>
                                {categories.map((category) => (
                                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                ))}
                            </select>
                            {errors.categoryId && (<p style={{ color: "red", fontSize: "14px" }}>{errors.categoryId}</p>)}
                        </div>

                        <div className="form-group">
                            <label className="styled-label">Date: </label>
                            <input type="date" name="expenseDate" className="form-control" value={expense.expenseDate} onChange={onChangeHandler} />
                            {errors.expenseDate && (<p style={{ color: "red", fontSize: "14px" }}>{errors.expenseDate}</p>)}
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Amount: </label>
                            <input placeholder="Expense Amount" name="amount" className="form-control" value={expense.amount} onChange={onChangeHandler} />
                            {errors.amount && (<p style={{ color: "red", fontSize: "14px" }}>{errors.amount}</p>)}
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Description: </label>
                            <input placeholder="Expense Description" name="description" className="form-control" value={expense.description} onChange={onChangeHandler} />
                            {errors.description && (<p style={{ color: "red", fontSize: "14px" }}>{errors.description}</p>)}
                        </div>
                        <button type="submit" className="btn-submit w-100 mt-3"onClick={expenseSave}>Save</button> 
                        <button type="button" className="btn-submit w-100 mt-3" onClick={returnBack}>Return</button>    
                    </form>
                </div>
            </div>
        </div>
    );



}
export default ExpenseEntry;
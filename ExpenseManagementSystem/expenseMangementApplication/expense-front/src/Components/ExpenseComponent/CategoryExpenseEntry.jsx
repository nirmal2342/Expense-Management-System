import React, { useState, useEffect } from "react";
import {  useParams,useNavigate } from "react-router-dom";
import { saveExpense, generateExpenseById } from "../../Services/ExpenseService";
import { getCustomerByUsername,getCustomerStatusByUsername } from "../../Services/CustomerService";
import {displayCategoryById} from '../../Services/CategoryService';
import "../../LoginView.css";

const CategoryExpenseEntry = () => {
    const { categoryId } = useParams(); 
    console.log("Received categoryId:", categoryId);
    const [expense, setExpense] = useState({
        expenseId: "",
        customerId: "",
        categoryId: "", 
        expenseDate: "",
        amount: "",
        description: "",
    });
     const [category,setCategory]=useState([]);
    const [customer, setCustomer] = useState({ });
    const [newId, setNewId] = useState("");
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
    

    const setCustomerData = () => {
        getCustomerByUsername().then((response) => {
            if(!response.data){
                alert("Please Complete Your Customer Registration.");
                navigate('/CustomerMenu'); 
                
            }else{
                setCustomer(response.data);
            }
        });
        
    };

    const setExpenseId = () => {
        generateExpenseById().then((response) => {
            setNewId(response.data);
        });
    };
     const setCategoryData=()=>{
        displayCategoryById(categoryId).then((response) => {
            setCategory(response.data); 
            setExpense((prevExpense) => ({
                ...prevExpense,
                categoryId: response.data.categoryId, 
            }));
        });
     };

     const checkStatus = () => {
                 getCustomerStatusByUsername().then(response => {
                     console.log(response.data);
                     if (response.data ===  false) {
                         alert("Customer is inactive. Please activate the account.");
                         navigate('/customer-category-list'); 
                     } else {
                         setExpenseId();
                     }
                 });
             };
     

    useEffect(() => {
        checkStatus();
        setCustomerData();
        setCategoryData();
    }, [categoryId]);

    const returnBack = () => {
        navigate("/customer-category-list");
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setExpense((values) => ({ ...values, [name]: value }));
    };
    const expenseSave = async (event) => {
        event.preventDefault();
    
        if (!validateForm()) return;
    
        // Create updated expense object from current state values
        const updatedExpense = {
            ...expense,
            expenseId: newId,
            customerId: customer.customerId,
        };
    
        try {
            await saveExpense(updatedExpense);
            alert("New Expense is added");
    
            // Reset form after submission
            setExpense({
                expenseId: "",
                customerId: "",
                categoryId: categoryId,
                expenseDate: "",
                amount: "",
                description: "",
            });
    
            navigate("/CustomerMenu");
        } catch (err) {
            console.error("Expense Save Error:", err);
            alert("Something went wrong");
        }
    };
    
      

    const validateForm = () => {
        let formErrors = {};
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
        return Object.keys(formErrors).length === 0;
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
                            <input placeholder="Expense Id" name="expenseId" className="form-control" value={newId} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Customer Id: </label>
                            <input placeholder="Customer Id" name="customerId" className="form-control" value={customer.customerId} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Category Id: </label>
                            <input placeholder="Category Id" name="categoryId" className="form-control" value={expense.categoryId} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Date: </label>
                            <input type="date" name="expenseDate" className="form-control" value={expense.expenseDate} onChange={onChangeHandler} />
                            {errors.expenseDate && <p style={{ color: "red" }}>{errors.expenseDate}</p>}
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Amount: </label>
                            <input placeholder="Expense Amount" name="amount" className="form-control" value={expense.amount} onChange={onChangeHandler} />
                            {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Description: </label>
                            <input placeholder="Expense Description" name="description" className="form-control" value={expense.description} onChange={onChangeHandler} />
                            {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
                        </div>
                        <button type="submit" className="btn-submit w-100 mt-3" onClick={expenseSave}>Save</button>
                        <button type="button" className="btn-submit w-100 mt-3" onClick={returnBack}>Return</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryExpenseEntry;

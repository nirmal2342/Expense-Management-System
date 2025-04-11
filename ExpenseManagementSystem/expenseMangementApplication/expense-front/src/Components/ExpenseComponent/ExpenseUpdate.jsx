import React,{useState,useEffect} from "react";
import {displayExpenseById,updateExpense} from '../../Services/ExpenseService';
import { useNavigate ,useParams } from "react-router-dom";
import '../../LoginView.css';

const ExpenseUpdate = () => {
    const [expense, setExpense] = useState({
        expenseId: 0,
        customerId :0,
        categoryId: 0,
        expenseDate: "",
        amount:"",
        description: "",
    });

    let navigate = useNavigate();
    const { id } = useParams(); 
    const returnBack=()=>{
        navigate('/expense-list'); 
       };

    useEffect(() => {
        displayExpenseById(id).then((response) => {
            setExpense(response.data);
        });
    }, [id]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setExpense((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const expenseUpdate = (event) => {
        event.preventDefault();
        updateExpense(expense).then(() => {
            alert("Expense updated successfully");
            navigate('/expense-list');
        });
    };

   
    return (
     
        <div className="login-page" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="login-container p-4 shadow" style={{ width: "400px", borderRadius: "10px" }}> 
                <div className="card-body">
                    <h2 className="text-center updateCustomer"><u>Update Expense</u></h2>
                    <br />
                    <form>
                        <div className="form-group">
                            <label  className="styled-label">Expense Id: </label>
                            <input name="expenseId" className="form-control" value={expense.expenseId} readOnly />
                        </div>
                        <div className="form-group">
                            <label  className="styled-label">Customer Id: </label>
                            <input name="customerId" className="form-control" value={expense.customerId} readOnly />
                        </div>
                        <div className="form-group">
                            <label  className="styled-label">Category Id: </label>
                            <input name="categoryId" className="form-control" value={expense.categoryId} readOnly />
                        </div>
                        <div className="form-group">
                            <label  className="styled-label">Expense Date: </label>
                            <input type="date" name="expenseDate" className="form-control"  value={expense.expenseDate} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label  className="styled-label">Expense Amount: </label>
                            <input placeholder="Expense Amount" name="amount" className="form-control" value={expense.amount} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label  className="styled-label">Description: </label>
                            <input placeholder="Description" name="description" className="form-control" value={expense.description} onChange={onChangeHandler} />
                        </div>
                        <button type="submit" className="btn-submit w-100 mt-3"onClick={expenseUpdate}>Save</button> 
                        <button type="button" className="btn-submit w-100 mt-3" onClick={returnBack}>Return</button>    
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ExpenseUpdate;
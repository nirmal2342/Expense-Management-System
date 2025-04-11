import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getExpenseReportByCustomer } from "../../Services/ExpenseService";
import "../../LoginView.css";

const ExpenseAnalysis=()=>{
    let navigate = useNavigate();
    const [customerExpenses, setCustomerExpenses] = useState([]);

    const setCustomerExpenseData = () => {
        getExpenseReportByCustomer().then((response) => {
            if(response.data.length === 0){
                alert("No Expense Found.");
                navigate('/CustomerMenu'); 
                
            }else{
                setCustomerExpenses(response.data);
            }
           
            });
        };

    useEffect(() => {
        setCustomerExpenseData();
     }, []);
        
    const returnBack = () => {
     navigate("/CustomerMenu");
      };

     return (
        <div className="text-center">
           <div>
             <h2 className="text-center">Your Expense Categorywise Report</h2>
                <hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />
                <div className="row">
                    <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                          <th>Category Id</th>
                          <th>Amount</th>
                         </tr>
                    </thead>
                    <tbody>
                    {
                    customerExpenses.map((custexpense, index) => (
                        <tr key={custexpense.categoryId}>
                         <td>{custexpense.categoryId}</td>
                         <td>{custexpense.amount}</td>
                        </tr>
                ))
                }
            </tbody>
            </table>
            <br/>
            <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn-submit">Return</button>
            </div>
            </div>
            </div>
     )
    
};

export default ExpenseAnalysis;
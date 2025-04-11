import React ,{useState,useEffect} from "react";
import { deleteExpenseById,displayExpenseByCustomer } from '../../Services/ExpenseService';
import {displayAllCategories} from '../../Services/CategoryService';
import { useNavigate ,Link} from "react-router-dom";
import '../../LoginView.css';

const ExpenseList=()=>{

    const [expenses,setExpense]=useState([]);
    const [categories,setCategories]=useState([]);
    let navigate=useNavigate();
    
   

        const setExpenseData = () => {
            displayExpenseByCustomer().then((response) => {
              //console.log("Hii",response.data.length);
              if(response.data.length === 0){
                alert("No Expense Found.");
                navigate('/CustomerMenu'); 
                
            }else{
              setExpense(response.data);
            }
              
                           
            });
        
    };

         const setCategoryData=()=>{
                    displayAllCategories().then((response) => {
                                setCategories(response.data);
                            });
            
                };

        useEffect(() => {
            setExpenseData();
            setCategoryData();
               }, []);
        
               const returnBack=()=>{
                navigate('/CustomerMenu'); 
               }
        
               const removeExpense=(id)=>{
                deleteExpenseById(id).then( res => {
                    let remainExpense=expenses.filter((expense) => (expense.expenseId !== id));
                    setExpense(remainExpense);
               });
              navigate('/expense-list');
            }

            return (
                    <div className="login-page">
                    <div>
                        <h2 className="login-container updateCustomer ">ExpenseList </h2>
                         <hr style={{height: "3px", borderWidth:0, color:"yellow", backgroundColor:"red"}} className="fancy-hr"/>
                          <div className = "row">
                          <table className = "table table-striped table-bordered">
                           <thead>
                           <tr>
                             <th> Expense Id</th>
                             <th> Customer Id</th>
                             <th> Category Name</th>
                             <th> Expense Date </th>
                             <th>Expense Amount</th>
                             <th>Description</th>
                             <th>Update Expense</th>
                             <th>Delete Expense</th>
                          </tr>
                          </thead>
                          <tbody>
                             {
                                expenses.map((expense, index) => (
                                  <tr key = {expense.expenseId}>
                                  <td>{expense.expenseId}</td>
                                  <td>{expense.customerId}</td>
                                  <td>{categories.find(cat => cat.categoryId === expense.categoryId)?.categoryName}</td>
                                  <td>{expense.expenseDate}</td>
                                  <td>{expense.amount}</td>
                                  <td>{expense.description}</td>
                                  <td><Link to={`/update-expense/${expense.expenseId}`}><button style={{marginLeft: "10px"}}  className="btn-submit">Update </button></Link></td>
                                  <td><button style={{marginLeft: "10px"}} onClick={()=>removeExpense(expense.expenseId)} className="btn-submit">Delete</button></td>
                                  </tr>
                              ) )
                           }                        
                     </tbody>
                    </table>
                    <br/>
                     <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn-submit">Return</button>    
                   </div>
                 </div>
                </div>
             
                );


}
export default ExpenseList;

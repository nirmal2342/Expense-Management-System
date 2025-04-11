import React ,{useState,useEffect} from "react";
import {getCurrentCustomers} from '../../Services/CustomerService';
import { useNavigate } from "react-router-dom";
import '../../LoginView.css';

const CustomerCurrent=()=>{

    const [customers,setCustomers]=useState([]);

    let navigate=useNavigate();

    const setCustomerData=()=>{
        getCurrentCustomers().then((response) => {
            setCustomers(response.data);
                });

    }

    useEffect(() => {
        setCustomerData()
       }, []);

       const returnBack=()=>{
        navigate('/AdminMenu'); 
       }

  

    return (
        <div className="login-page">
        <div>
            <h2 className="login-title login-container  ">Curent CustomerList </h2>
             <hr style={{height: "3px", borderWidth:0, color:"yellow", backgroundColor:"red"}} className="fancy-hr"/>
              <div className = "row">
              <table className = "table table-striped table-bordered">
               <thead>
               <tr>
                 <th> Customer Id</th>
                 <th> Customer Name</th>
                 <th> UserName</th>
                 <th> Customer Address </th>
                 <th> Customer Email</th>
                 <th> Mobile</th>
                 <th> Occupation </th>
                 <th> Status </th>
              </tr>
              </thead>
              <tbody>
                 {
                    customers.map((customer, index) => (
                      <tr key = {customer.customerId}>
                      <td>{customer.customerId}</td>
                      <td>{customer.customerName}</td>
                      <td>{customer.username}</td>
                      <td>{customer.address}</td>
                      <td>{customer.email}</td>
                      <td>{customer.mobile}</td>
                      <td>{customer.occupation}</td>
                      <td>{customer.status}</td>
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
export default CustomerCurrent;
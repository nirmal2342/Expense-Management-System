import React, { useState, useEffect } from "react";
import { getCustomerByUsername } from '../../Services/CustomerService';
import { useNavigate} from "react-router-dom";
import '../../LoginView.css';

const CustomerDetails = () => {
const [customer,setCustomers]=useState({
    customerId:"",
    username:"",
    customerName:"",
    address:"",
    email:"",
    mobile:0,
    occupation:"",
    status:""
});

    let navigate=useNavigate();

    const setCustomerData=()=>{
        getCustomerByUsername().then((response) => {
           
            setCustomers(response.data);
                });

    }
    

    useEffect(() => {
        setCustomerData()
       }, []);

       const returnBack=()=>{
        navigate('/CustomerMenu'); 
       }

  

    return (
        <div className="login-page">
        <div>
            <h2 className="login-container updateCustomer">CustomerDetails</h2>
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
              
                      
                      <td>{customer.customerId}</td>
                      <td>{customer.customerName}</td>
                      <td>{customer.username}</td>
                      <td>{customer.address}</td>
                      <td>{customer.email}</td>
                      <td>{customer.mobile}</td>
                      <td>{customer.occupation}</td>
                      <td>{customer.status}</td>
                     
                                     
         </tbody>
        </table>
        <br/>
         <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn-submit">Return</button>    
       </div>
     </div>
    </div>
 
    );

};
export default CustomerDetails;
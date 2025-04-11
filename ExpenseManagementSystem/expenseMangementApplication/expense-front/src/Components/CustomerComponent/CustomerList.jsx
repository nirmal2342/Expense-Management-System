import React ,{useState,useEffect} from "react";
import {getAllCustomers} from '../../Services/CustomerService';
import { useNavigate,Link } from "react-router-dom";
import '../../LoginView.css';

const CustomerList=()=>{

    const [customers,setCustomers]=useState([]);

    let navigate=useNavigate();

    const setCustomerData=()=>{
        getAllCustomers().then((response) => {
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
        <div className="text-center login-page">
        <div>
            <h2 className="text-center login-container heading">Customer List </h2>
            <hr className="fancy-hr" />
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
                 <th>Update Customer</th>
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
                      <td><Link to={`/customer-update/${customer.customerId}`}><button style={{marginLeft: "10px"}}  className="btn-submit">Update </button></Link></td>
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
export default CustomerList;
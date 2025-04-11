import React ,{useState,useEffect} from "react";
import {getAllCustomers} from '../../Services/CustomerService';
import { useNavigate,Link } from "react-router-dom";
import '../../LoginView.css';

const AdminExpenseReport=()=>{

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
        <div className="login-page ">
        <div>
            <h2 className="login-container updateCustomer long-heading">Expense Report of All Customers </h2>
             <hr style={{height: "3px", borderWidth:0, color:"yellow", backgroundColor:"#15b8bb"}} className="fancy-hr"/>
              <div className = "row">

<div className="row ">
  <div className="table-container"> {/* <-- Add this wrapper */}
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th> Customer Id</th>
          <th> Customer Name</th>
          {/* <th> UserName</th> */}
          {/* <th> Customer Address </th> */}
          <th> Customer Email</th>
          {/* <th> Mobile</th> */}
          {/* <th> Occupation </th> */}
          {/* <th> Status </th> */}
          <th>Customer Report</th>
        </tr>
      </thead>
      <tbody>
        {
          customers.map((customer, index) => (
            <tr key={customer.customerId}>
              <td>{customer.customerId}</td>
              <td>{customer.customerName}</td>
              {/* <td>{customer.username}</td> */}
              {/* <td>{customer.address}</td> */}
              <td>{customer.email}</td>
              {/* <td>{customer.mobile}</td> */}
              {/* <td>{customer.occupation}</td> */}
              {/* <td>{customer.status}</td> */}
              <td>
                <Link to={`/expense-report/${customer?.customerId}`}>
                  <button style={{ marginLeft: "10px" }} className="btn-submit btn-small">View Report</button>
                </Link>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
  <br />
  <button style={{ marginLeft: "10px" }} onClick={returnBack} className="btn-submit">Return</button>
</div>

        {/* <br/>
         <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-success">Return</button>     */}
       </div>
     </div>
    </div>
 
    );
}
export default AdminExpenseReport;
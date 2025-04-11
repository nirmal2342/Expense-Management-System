import React, { useState, useEffect } from "react";
import { getCustomerById, updateCustomer } from '../../Services/CustomerService';
import { useNavigate,useParams } from "react-router-dom";
import '../../LoginView.css';

const CustomerUpdate=()=>{

    const [customer, setCustomer] = useState({
        customerId: "",
        username :"",
        customerName: "",
        address: "",
        email:"",
        mobile: "",
        occupation: "",
        status: ""

    });
    let navigate = useNavigate();
    const { id } = useParams(); 
    console.log("Customer ID:", id);

    useEffect(() => {
        getCustomerById(id).then((response) => {
            setCustomer(response.data);
        });
    
    }, [id]);

    const returnBack=()=>{
        navigate('/customer-list'); 
       }


    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCustomer((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const customerUpdate = (event) => {
        event.preventDefault();
        updateCustomer(customer).then(() => {
            alert("Customer updated successfully");
            navigate('/customer-list');
        });
    };

    

   
    return (
     
        <div className="login-page" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="login-container p-4 shadow" style={{ width: "400px", borderRadius: "10px" }}> 
                <div className="card-body">
                    <h2 className="login-title  updateCustomer "><u>Update Customer</u></h2>
                    <br />
                    <form>
                        <div className="form-group ">
                            <label className="styled-label">Customer Id: </label>
                            <input name="customerId" className="form-control styled-input" value={customer.customerId} readOnly />
                        </div>
                        <div className="form-group ">
                            <label className="styled-label">Status: </label>
                            <input placeholder="Status" name="status" className="form-control" value={customer.status} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Customer Name: </label>
                            <input placeholder="Customer Name" name="customerName" className="form-control" value={customer.customerName} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group ">
                            <label className="styled-label">Address: </label>
                            <input placeholder="Address" name="address" className="form-control" value={customer.address} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group p">
                            <label className="styled-label">Mobile: </label>
                            <input placeholder="Mobile" name="mobile" className="form-control" value={customer.mobile} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group ">
                            <label className="styled-label">Occupation: </label>
                            <input placeholder="Occupation" name="occupation" className="form-control" value={customer.occupation} onChange={onChangeHandler} />
                        </div>
                        
                             <button type="submit" className="btn-submit w-100 mt-3"onClick={customerUpdate}>Update</button> 
                            <button type="button" className="btn-submit w-100 mt-3" onClick={returnBack}>Return</button>    
                        
 
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerUpdate;
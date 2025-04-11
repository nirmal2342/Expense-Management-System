import React, { useState, useEffect } from "react";
import { saveCustomer, getCustomerStatusByUsername,generateCustomerId } from '../../Services/CustomerService';
import { useNavigate } from "react-router-dom";
import '../../LoginView.css';

const CustomerAddition = () => {

    const [customer, setCustomer] = useState({
        customerId: "",
        username :"A",
        customerName: "",
        address: "",
        email:"A",
        mobile: "",
        occupation: "",
        status: "A"

    });

    const [newId, setNewId] = useState("");
   const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    const setCustomerId = () => {
        generateCustomerId().then((response) => {
            setNewId(response.data);
        });
    }
    const checkStatus = () => {
        getCustomerStatusByUsername().then(response => {
            if (response.data === true || response.data === false) {
                alert("Customer is already registered.....");
                navigate("/CustomerMenu");
            } else {
                setCustomerId();
            }
        });
    }
    
    useEffect(() => {
        checkStatus();
    }, []);

    const returnBack=()=>{
       
         navigate('/CustomerMenu'); 
        }


    const onChangeHandler = (event) => {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;
        setCustomer(values => ({ ...values, [name]: value }));
    };

    const customerSave = (event) => {
        event.preventDefault();
       if (!validateForm()) return; // Stop submission if validation fails
        customer.customerId = newId;
        saveCustomer(customer).then((response) => {
            alert("New Customer is added");
            navigate('/CustomerMenu');
        });
    }

    const validateForm = () => {
        let formErrors = {};
        if (!customer.customerName.trim()) {
            formErrors.customerName = "Customer Name is required!";
        }
        if (!customer.address.trim()) {
            formErrors.address = "Customer Address is required!";
        }
        if (!customer.mobile.trim()) {
            formErrors.mobile = "Mobile Number is required!";
        } else if (customer.mobile.length !== 10) {
            formErrors.mobile = "Mobile Number must be 10 digits!";
        }
        if (!customer.occupation.trim()) {
            formErrors.occupation = "Customer Occupation is required!";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; // Returns true if no errors
    };

    

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="card-body">
                    <h2 className="text-center updateCustomer"><u>Customer Addition</u></h2>
                    <br />
                    <form>
                        <div className="form-group">
                            <label className="styled-label">Customer Id: </label>
                            <input placeholder="Customer Id" name="customerId" className="form-control" value={newId} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="styled-label"> Name: </label>
                            <input placeholder="Customer Name" name="customerName" className="form-control" value={customer.customerName} onChange={onChangeHandler} />
                            {errors.customerName && ( <p style={{ color: "red", fontSize: "14px" }}>{errors.customerName}</p>)}
                        </div>
                        <div className="form-group">
                            <label className="styled-label"> Address: </label>
                            <input placeholder="Customer Address" name="address" className="form-control" value={customer.address} onChange={onChangeHandler} />
                            {errors.address && ( <p style={{ color: "red", fontSize: "14px" }}>{errors.address}</p>)}
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Mobile: </label>
                            <input placeholder="Customer Mobile" name="mobile" className="form-control" value={customer.mobile} onChange={onChangeHandler} />
                            {errors.mobile && ( <p style={{ color: "red", fontSize: "14px" }}>{errors.mobile}</p>)}
                        </div>
                        <div className="form-group">
                            <label className="styled-label">Occupation: </label>
                            <input placeholder="Customer Occupation" name="occupation" className="form-control" value={customer.occupation} onChange={onChangeHandler} />
                            {errors.occupation && ( <p style={{ color: "red", fontSize: "14px" }}>{errors.occupation}</p>)}
                        </div>
                        <button type="submit" className="btn-submit w-100 mt-3"onClick={customerSave}>Save</button> 
                        <button type="button" className="btn-submit w-100 mt-3" onClick={returnBack}>Return</button>    
                    </form>
                </div>
            </div>
        </div>
    );



}
export default CustomerAddition;
import React, { useState } from "react";
import { registerNewUser } from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";

const RegisterUser = () => {
    const [expenseUser, setExpenseUser] = useState({
        username: "",
        password: "",
        email: "",
        category: "",
    });

    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    const validateForm = () => {
        let formErrors = {};

        if (!expenseUser.username.trim()) {
            formErrors.username = "Username is required!";
        }

        if (!expenseUser.password) {
            formErrors.password = "Password is required!";
        } else if (expenseUser.password.length < 5 || expenseUser.password.length > 10) {
            formErrors.password = "Password must be 5 to 10 characters long!";
        }

        if (!password2) {
            formErrors.password2 = "Please confirm your password!";
        } else if (expenseUser.password !== password2) {
            formErrors.password2 = "Passwords do not match!";
        }

        if (!expenseUser.email.trim()) {
            formErrors.email = "Email is required!";
        } else if (!/\S+@\S+\.\S+/.test(expenseUser.email)) {
            formErrors.email = "Invalid email format!";
        }

        if (!expenseUser.category) {
            formErrors.category = "Please select a category!";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const saveNewUser = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        registerNewUser(expenseUser).then(() => {
            alert("User is registered successfully! Please log in.");
            navigate("/");
        });
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setExpenseUser((values) => ({ ...values, [name]: value }));
    };


    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">Register</h2>
                <form onSubmit={saveNewUser}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={expenseUser.username}
                            onChange={onChangeHandler}
                            
                        />
                         {errors.username && <p className="error-text">{errors.username}</p>}
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={expenseUser.password}
                            onChange={onChangeHandler}
                           
                        />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            
                        />
                        {errors.password2 && <p className="error-text">{errors.password2}</p>}
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            value={expenseUser.email}
                            onChange={onChangeHandler}
                            
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    <div className="input-group">
                        <label>Select Category</label>
                        <select
                            name="category"
                            value={expenseUser.category}
                            onChange={onChangeHandler}
                            
                        >
                            <option value="">Choose...</option>
                            <option value="Customer">Customer</option>
                            <option value="Admin">Admin</option>
                        </select>
                        {errors.category && <p className="error-text">{errors.category}</p>}
                    </div>
                    <button type="submit" className="btn-submit">
                        Register
                    </button>
                    <button className="btn-register mt-4" onClick={() => navigate("/Login")}>
                    Login
                </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;


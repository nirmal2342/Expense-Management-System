import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { validateUser } from "../../Services/LoginService";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    let navigate = useNavigate();

    const validateLoginForm = () => {
        const formErrors = {};
        if (!username.trim()) {
            formErrors.username = "Username is required!";
        }

        if (!password) {
            formErrors.password = "Password is required!";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };


    const checkLogin = (e) => {
        e.preventDefault();

        if (!validateLoginForm()) return;

        validateUser(username, password).then((response) => {
            console.log("Full API Response:", response);
            let category = String(response.data);

            if (category === "Admin" || category === "Customer") {
                localStorage.setItem("userCategory", category);
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("username", username);

                navigate(category === "Admin" ? "/AdminMenu" : "/CustomerMenu");
            } else {
                alert("Wrong User ID or Password");
            }
        });
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title updateCustomer">Login Page</h2>
                <form onSubmit={checkLogin}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            
                        />
                        {errors.username && <p className="error-text">{errors.username}</p>}

                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />
                        {errors.password && <p className="error-text">{errors.password}</p>}


                    </div>
                    <button type="submit" className="btn-submit">
                        Login
                    </button>
                </form>
                <br />
                <button className="btn-register" onClick={() => navigate("/Register")}>
                    Register New User
                </button>
            </div>
        </div>
    );
};

export default LoginPage;

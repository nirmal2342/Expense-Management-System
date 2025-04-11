import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, getCustomerByUsername } from "../../Services/CustomerService";
import { getExpenseReport, sendExpenseReport } from "../../Services/ExpenseReportService";
import { getExpenseReportByCustomerId } from "../../Services/ExpenseService";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import "../../LoginView.css";

const COLORS = ["#0088FE", "#FF0000", "#00C49F", "#FFBB28", "#A28FFF"];

const AdminCustomerReport = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState();
  const [CustomerExpenses, setCustomerExpense] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (customerId) {
      fetchCustomerById(customerId);
    } else {
      getCustomerData(); 
    }
  }, [customerId]);

  const fetchCustomerById = async (id) => {
    try {
      const response = await getCustomerById(id);
      setCustomer(response.data);
      fetchExpenseData(id);
    } catch (error) {
      console.error("Error fetching customer by ID:", error);
    }
  };

  const getCustomerData = async () => {
    try {
      const response = await getCustomerByUsername();
      setCustomer(response.data);
      fetchExpenseData(response.data.customerId);
    } catch (error) {
      console.error("Error loading customer:", error);
    }
  };

  const getReport = async () => {
    if (!customer) return alert("Customer data is not loaded yet!");
    try {
      const response = await getExpenseReport(customer.customerId);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      alert("Failed to retrieve PDF from backend.");
    }
  };

  console.log("Raw CustomerExpenses:", CustomerExpenses);

  const sendEmailReport = async () => {
    if (!customer) return alert("Customer data is not loaded yet!");
    try {
      const response = await sendExpenseReport(customer.email, customer.customerId);
      alert(response.data);
    } catch (error) {
      console.error("Error while sending report:", error);
    }
  };

  const fetchExpenseData = async (customerId) => {
    try {
      const response = await getExpenseReportByCustomerId(customerId);
      setCustomerExpense(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const returnBack = () => {
    navigate("/adminReport");
  };

  return (
    <div  style={{ minHeight: "100vh", overflowY: "auto", display: "block" }}>
      <div
        style={{
          background: "linear-gradient(-45deg, #ffffff, #17212a, #6dbdbd, #181f1f)",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <h1 className="text-center fw-bold mb-5 login-container updateCustomer long-heading" >
        Expense Report {customer?.customerName ? `for ${customer.customerName}` : "Loading..."}
        </h1>

        <div className="expense-container">
          <div className="row align-items-start">
            <div className="col-md-6 text-center mb-4">
              <h4 className="mb-3 updateCustomer">Expense Analysis</h4>
              <hr style={{ height: "3px", backgroundColor: "#444", width: "60%", margin: "0 auto 20px" }} className="fancy-hr"/>
              {CustomerExpenses.length > 0 ? (
  <div
    style={{
      background: "rgba(255, 255, 255, 0.15)",
      padding: "20px",
      borderRadius: "20px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      backdropFilter: "blur(8px)",
      maxWidth: "650px",
      margin: "0 auto",
    }}
  >
    <PieChart width={600} height={300}>
      <Pie
        data={CustomerExpenses}
        dataKey="amount"
        nameKey="categoryName"
        cx="50%"
        cy="50%"
        innerRadius={50}
        outerRadius={100}
        fill="#8884d8"
        label={({ name }) => name}
      >
        {CustomerExpenses.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }}
        itemStyle={{ color: "#000" }}
      />
      <Legend wrapperStyle={{ color: "#fff" }} />
    </PieChart>
  </div>
) : (
  <p className="text-light font-bold ">No expense data available.</p>
)}


            </div>
            <div className="col-md-6 text-center mb-4">
              <h4 className="mb-3 updateCustomer">Report Actions</h4>
              <hr style={{ height: "3px", backgroundColor: "#444", width: "60%", margin: "0 auto 20px" }} className="fancy-hr"/>
              <button className="btn-submit m-2 w-75 " onClick={getReport}>
                View Expense Report
              </button>
              <button className="btn-submit m-2 w-75" onClick={sendEmailReport}>
                Send Email Report
              </button>
              <button
                className="btn-submit w-75 "
                style={{ width: "700px", fontWeight: "bold",marginTop: "5px", marginBottom: "80px" }}
                onClick={returnBack}
              >
                Return
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
  
};

export default AdminCustomerReport;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerByUsername } from "../../Services/CustomerService";
import { getExpenseReport, sendExpenseReport } from "../../Services/ExpenseReportService";
import { getExpenseReportByCustomer } from "../../Services/ExpenseService";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import "../../LoginView.css";

const COLORS = ["#0088FE", "#FF0000", "##FF0000", "#FF8042", "#A28FFF"];

const ExpenseReport = () => {
  const [customer, setCustomer] = useState();
  const [CustomerExpenses, setCustomerExpense] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomerData();
  }, []);

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
      if (response.status === 404) {
        alert(response.headers.get("Warning") || "No expenses found for this customer.");
        return;
      }
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      alert("Failed to retrieve PDF from backend.");
    }
  };

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
      const response = await getExpenseReportByCustomer(customerId);
      setCustomerExpense(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const returnBack = () => {
    navigate("/CustomerMenu");
  };

  return (
    <div 
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        display: "block", // override global body flex
      }}
    >
      <div 
        style={{
          background: "linear-gradient(-45deg, #ffffff, #17212a, #6dbdbd, #181f1f)",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <h1
          className="login-container updateCustomer  fw-bold "
          style={{ letterSpacing: "1px" }}
        >
          Expense Report
        </h1>

        <div className="expense-container">
          <div className="row align-items-start">
            <div className="col-md-6 text-center mb-4">
              <h4 className="mb-3 updateCustomer">Expense Analysis</h4>
              <hr
                style={{
                  height: "3px",
                  borderWidth: 0,
                  backgroundColor: "#444",
                  width: "60%",
                  margin: "0 auto 20px",
                }}
              />
              {CustomerExpenses.length > 0 ? (
  <div
    style={{
      background: "rgba(255, 255, 255, 0.15)",
      padding: "20px",
      borderRadius: "20px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      backdropFilter: "blur(8px)",
      maxWidth: "700px",
      margin: "0 auto",
    }}
  >
    <PieChart width={650} height={400}>
      <Pie
        data={CustomerExpenses}
        dataKey="amount"
        nameKey="categoryId"
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={120}
        fill="#8884d8"
        label={({ name }) => name}
      >
        {CustomerExpenses.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
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
              <hr
                style={{
                 height: "3px",
                borderWidth: 0,
                backgroundColor: "#444",
                width: "60%",
                margin: "0 auto 20px",
                }}
                />

              <button className="btn-submit m-2 w-75" onClick={getReport}>
                View Expense Report
              </button>
              <button className="btn-submit m-2 w-75" onClick={sendEmailReport}>
                Send Email Report
              </button>
              <button
                className="btn-submit m-2 w-75"
                 style={{ width: "700px", fontWeight: "bold", marginTop:"1rem" }}
                onClick={returnBack}>Return</button>

            </div>
            </div>
          </div>
          
      </div>
    </div>
  );
};

export default ExpenseReport;

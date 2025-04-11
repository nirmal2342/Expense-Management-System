import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import heroImage from "./expense.png"; // Add your left-side image
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaChartPie, FaTag, FaUserShield, FaDatabase, FaWallet, FaTasks } from "react-icons/fa";

const quotes = [
  "Track your expenses, secure your future!",
  "A budget is telling your money where to go.",
  "Save money, live better!",
  "Financial freedom starts with tracking expenses.",
  "Every penny saved is a penny earned."
];

const HomePage = () => {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 6000); // Change quote every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <p>Expense Management
                  System</p>
        <div className="nav-links">
        <a href="#Home">Home</a>
        <a href="#About">About</a>
        <a href="#Contact">Contact Us</a>
        <div className="auth-buttons">
          <button className="button login" onClick={() => navigate("/Login")}>Login</button>
          <button className="button signup" onClick={() => navigate("/Register")}>Sign Up</button>
        </div>
        </div> 
      </header>

      {/* Main Section */}
      <div className="main" id="Home">
        {/* Left Side - Image */}
        <img src={heroImage} alt="heroimage" className="heroimage" />
        
        {/* Right Side - Quotes */}
        <div className="quotes-container">
          <p className="quote">{quotes[quoteIndex]}</p>
        </div>
      </div>

      <section className="about-section" id="About">
      <h2 className="about-title">Designed for Simplicity, Built for Security</h2>
      <p className="about-subtitle">
        Discover the suite of features that make Expenses Manager the ultimate tool for your money management.
      </p>

      <div className="about-container">
        {/* Features List */}
        <div className="about-content">
          <div className="feature">
            <FaWallet className="feature-icon" />
            <h3>Budget Planner</h3>
            <p>Set budgets for different categories and monitor your spending against them.</p>
          </div>

          <div className="feature">
            <FaChartPie className="feature-icon" />
            <h3>Insightful Reports</h3>
            <p>Visualize your spending. Gain insights with detailed analytics and predictions.</p>
          </div>

          <div className="feature">
            <FaTasks className="feature-icon" />
            <h3>Account Management</h3>
            <p>Efficiently manage all your accounts in one place. Add transactions and track balances.</p>
          </div>

          <div className="feature">
            <FaTag className="feature-icon" />
            <h3>Categories</h3>
            <p>Personalize your tracking. Organize expenses with custom tags and categories.</p>
          </div>

          <div className="feature">
            <FaUserShield className="feature-icon" />
            <h3>Privacy-First App</h3>
            <p>Your data never leaves your device. No clouds, no servers, no peeping eyes.</p>
          </div>

          <div className="feature">
            <FaDatabase className="feature-icon" />
            <h3>Secure Backups</h3>
            <p>Retain your expenses history with encrypted backups, ensuring maximum security.</p>
          </div>
        </div>

        {/* App Screenshot */}
        <div className="about-image">
          <div className="mockup"></div>
        </div>
      </div>
    </section>

      <section className="contect" id="Contact">
      {/* Left Side: About */}
      <div className="max-w-md">
        <h2 className="text-xl font-semibold mb-3">Expenses Management System</h2>
        <p className="text-gray-400">
          Expenses Management System: A leading privacy-first finance management app designed to empower users 
          with secure, intuitive, and comprehensive tools for tracking expenses and budgeting. 
          With Expenses Manager, take control of your financial life while ensuring your data 
          remains secure and private.
        </p>
      </div>

      {/* Right Side: Contact */}
      <div className="text-right">
        <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
        <p className="text-gray-400">For queries and support, contact us at</p>
        <p className="font-semibold">help@expensesmanagementsystem.in</p>

        {/* Social Icons */}
        <h2 className="text-lg font-semibold mt-4">Follow us!</h2>
        <div className="flex gap-4 mt-2 justify-end">
          <a href="#" className="text-blue-600 text-2xl"><FaFacebook /></a>
          <a href="#" className="text-pink-600 text-2xl"><FaInstagram /></a>
          <a href="#" className="text-blue-400 text-2xl"><FaTwitter /></a>
        </div>


      </div>
    </section>


      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Expense Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

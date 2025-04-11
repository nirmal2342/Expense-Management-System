import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import CustomerMenu from "./Components/LoginComponent/CustomerMenu";
import CategoryAddition from "./Components/CategoryComponent/CategoryAddition";
import AdminCategoryList from "./Components/CategoryComponent/AdminCategoryList";
import CustomerCategoryList from "./Components/CategoryComponent/CustomerCategoryList";
import CategoryUpdate from "./Components/CategoryComponent/CategoryUpdate";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import CustomerList from "./Components/CustomerComponent/CustomerList";
import CustomerAddition from "./Components/CustomerComponent/CustomerAddition";
import CustomerUpdate from "./Components/CustomerComponent/CustomerUpdate";
import CustomerDetails from "./Components/CustomerComponent/CustomerDetails";
import CustomerCurrent from "./Components/CustomerComponent/CustomerCurrent";
import ExpenseEntry from "./Components/ExpenseComponent/ExpenseEntry";
import ExpenseList from "./Components/ExpenseComponent/ExpenseList";
import ExpenseUpdate from "./Components/ExpenseComponent/ExpenseUpdate";
import ExpenseReport from "./Components/ExpenseComponent/ExpenseReport";
import CategoryExpenseEntry from "./Components/ExpenseComponent/CategoryExpenseEntry";
import HomePage from "./Components/HomePageComponent/HomePage.jsx";
import AdminExpenseReport from "./Components/ExpenseComponent/AdminExpenseReport.jsx"
import AdminCustomerReport from "./Components/ExpenseComponent/AdminCustomerReport.jsx"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/Login' element={<LoginPage/>}/>
      <Route path='/Register' element={<RegisterUser/>}/>

      <Route element={<ProtectedRoute/>}>
      <>
      <Route path='/AdminMenu' element={<AdminMenu/>}/>
      <Route path='/CustomerMenu' element={<CustomerMenu/>}/>
      <Route path='/category-add' element={<CategoryAddition/>}/>
      <Route path='/admin-category-list' element={<AdminCategoryList/>}/>
      <Route path='/customer-category-list' element={<CustomerCategoryList/>}/>
      <Route path='/update-category/:id' element={<CategoryUpdate/>}/>
      <Route path='/customer-list' element={<CustomerList/>}/>
      <Route path='/customer-addition' element={<CustomerAddition/>}/>
      <Route path='/customer-update/:id' element={<CustomerUpdate />} />
      <Route path='/customer-details' element={<CustomerDetails />} />
      <Route path='/customer-current' element={<CustomerCurrent />} />
      <Route path='/expense-entry' element={<ExpenseEntry />} />
      <Route path='/expense-list' element={<ExpenseList />} />
      <Route path='/update-expense/:id' element={<ExpenseUpdate />} />
      <Route path='/expense-report-pdf' element={<ExpenseReport/>} />
      <Route path='/category-expense-entry/:categoryId' element={<CategoryExpenseEntry />} />
      <Route path='/adminReport' element={<AdminExpenseReport />} />
      <Route path='/expense-report/:customerId' element={<AdminCustomerReport />} />
      

      </>
      </Route>
        

      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;

import axios from 'axios';

const EXPENSE_URL = 'http://localhost:9797/exp-mng/expense'
const ID_URL = 'http://localhost:9797/exp-mng/expense-id'
const CATEGORY_URL = 'http://localhost:9797/exp-mng/expense-category'
const CUSTOMER_URL = 'http://localhost:9797/exp-mng/expense-customer'
const REPO_URL = 'http://localhost:9797/exp-mng/report'



export const saveExpense = (expense) => {
    return axios.post(EXPENSE_URL, expense);
}

export const generateExpenseById = () => {
    return axios.get(ID_URL);
}

export const updateExpense = (expense) => {
    return axios.put(EXPENSE_URL, expense);
}

export const displayAllExpenses = () => {
    return axios.get(EXPENSE_URL);
}

export const displayExpenseById = (id) => {
    return axios.get(EXPENSE_URL +'/'+ id);
}

export const deleteExpenseById = (id) => {
    return axios.delete(EXPENSE_URL +'/'+ id);
}

export const displayExpenseByCategory = () => {
    return axios.get(CATEGORY_URL);
}

export const displayExpenseByCustomer = () => {
    return axios.get(CUSTOMER_URL);
}

export const getExpenseByCustomer = (id) => {
    return axios.get(CUSTOMER_URL+'/'+ id);
}

export const getExpenseReportByCustomer = () => {
    return axios.get(REPO_URL);
}

export const getExpenseReportByCustomerId = (id) => {
    return axios.get(REPO_URL+'/'+ id);
}



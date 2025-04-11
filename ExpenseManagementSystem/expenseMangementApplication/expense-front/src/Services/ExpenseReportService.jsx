import axios from 'axios';

const EXPENSE_REPORT_VIEW = 'http://localhost:9797/exp-mng/expense-report/view';
const EXPENSE_REPORT_EMAIL = 'http://localhost:9797/exp-mng/expense-report/send-email';

export const getExpenseReport = (customerId) => {
    return axios.post(EXPENSE_REPORT_VIEW, { customerId },  { responseType: "blob", validateStatus: () => true });
};

export const sendExpenseReport = (email, customerId) => {
    return axios.post(EXPENSE_REPORT_EMAIL, { email, customerId });
};

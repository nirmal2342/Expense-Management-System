import axios from 'axios';

const CUSTOMER_URL = 'http://localhost:9797/exp-mng/customer'
const OTHER_URL = 'http://localhost:9797/exp-mng/customer-other'
const ID_URL = 'http://localhost:9797/exp-mng/customer-id'
const STAT_URL = 'http://localhost:9797/exp-mng/customer-status'
const Me_URL = 'http://localhost:9797/exp-mng/customer-me'


export const saveCustomer = (customer) => {
    return axios.post(CUSTOMER_URL, customer);
}

export const updateCustomer = (customer) => {
    return axios.put(CUSTOMER_URL, customer);
}

export const getAllCustomers = () => {
    return axios.get(CUSTOMER_URL);
}

export const getCustomerById = (id) => {
    return axios.get(CUSTOMER_URL +'/'+ id);
}

// export const deleteCustomerById = (id) => {
//     return axios.delete(CUSTOMER_URL +'/'+ id);
// }

export const generateCustomerId = () => {
    return axios.get(ID_URL);
}

export const getCurrentCustomers = () => {
    return axios.get(OTHER_URL);
}

export const getCustomerStatusByUsername = () => {
    return axios.get(STAT_URL);
}

export const getCustomerByUsername = () => {
    return axios.get(Me_URL);
}


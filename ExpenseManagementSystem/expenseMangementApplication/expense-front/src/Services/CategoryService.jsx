import axios from 'axios';

const CATEGORY_URL = 'http://localhost:9797/exp-mng/category'
const OTHER_URL = 'http://localhost:9797/exp-mng/category-other'

export const saveCategory = (category) => {
    return axios.post(CATEGORY_URL, category);
}

export const updateCategory = (category) => {
    return axios.put(CATEGORY_URL, category);
}

export const displayAllCategories = () => {
    return axios.get(CATEGORY_URL);
}

export const displayCategoryById = (id) => {
    return axios.get(CATEGORY_URL +'/'+ id);
}

export const deleteCategoryById = (id) => {
    return axios.delete(CATEGORY_URL +'/'+ id);
}

export const generateCategoryId = () => {
    return axios.get(OTHER_URL);
}


export const deleteCategoryByName = (name) => {
    return axios.delete(OTHER_URL +'/'+ name);
}
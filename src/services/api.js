import { client } from './index';

// Login
export const login = (data) => {
    return client.post(`/api/login`, data)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err.response));
};

// Add Category
export const addCategory = (data) => {
    return client.post(`/api/category`, data)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err.response));
};

// Edit Category
export const editCategory = (id,data) => {
  return client.patch(`/api/category/${id}`, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response));
};

// Get Category
export const getCategory = () => {
    return client.get(`/api/category`)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err.response));
};

// Add Sub Category
export const addSubCategory = (data) => {
  return client.post(`/api/sub-category`, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response));
};

// Add Sub Category Image
export const addSubCategoryImage = (id,data) => {
  return client.post(`/api/upload-image/${id}`, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response));
};

// Edit Sub Category
export const editSubCategory = (id,data) => {
  return client.patch(`/api/sub-category/${id}`, data)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response));
};

// Delete Sub Category
export const deleteSubCategory = (id) => {
  return client.delete(`/api/sub-category/${id}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response));
};
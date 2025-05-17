import axios from 'axios'

const API_URL = 'http://localhost:3000/products'

export async function createProduct(product) {
    return axios.post(API_URL, product)
}

export async function getProducts() {
    return axios.get(API_URL)
}

export async function deleteProduct(id) {
    return axios.delete(`${API_URL}/${id}`)
}

export async function updateProduct(id, updateProduct) {
    return axios.put(`${API_URL}/${id}`, updateProduct)
}

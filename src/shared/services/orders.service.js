import axios from 'axios'

const API_URL = 'http://localhost:3000/orders'

export async function createOrder(order) {
    return axios.post(API_URL, order)
}

export async function getOrders() {
    return axios.get(API_URL)
}

export async function deleteOrder(id) {
    return axios.delete(`${API_URL}/${id}`)
}

export async function updateOrder(id, updateOrder) {
    return axios.put(`${API_URL}/${id}`, updateOrder)
}
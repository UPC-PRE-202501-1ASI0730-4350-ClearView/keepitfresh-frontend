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

export async function getDishes() {
    return axios.get('http://localhost:3000/dishes')
}

export async function getOrdersByStatus(status) {
    return axios.get(`${API_URL}?status=${status}`)
}

export async function updateOrderStatus(id, status) {
    return axios.patch(`${API_URL}/${id}`, { status })
}

export async function getOrderAnalytics() {
    const response = await axios.get('http://localhost:3000/orders')
    const orders = response.data

    const monthlySales = {}
    const dishPopularity = {}

    orders.forEach(order => {
        const month = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long' })

        if (!monthlySales[month]) monthlySales[month] = 0
        monthlySales[month] += order.total

        // Contar popularidad de platos
        order.dishes?.forEach(dish => {
            if (!dishPopularity[dish.name]) dishPopularity[dish.name] = 0
            dishPopularity[dish.name] += dish.quantity
        })
    })

    const months = Object.keys(monthlySales)
    const sales = Object.values(monthlySales)
    const colors = ['#28a745', '#17a2b8', '#ffc107', '#dc3545', '#6f42c1']

    return {
        monthlySales: {
            labels: months,
            datasets: [
                {
                    label: 'Monthly Sales',
                    data: sales,
                    borderColor: '#28a745',
                    backgroundColor: '#28a74550',
                    tension: 0.4
                }
            ]
        },
        dishPopularity: {
            labels: Object.keys(dishPopularity),
            datasets: [
                {
                    data: Object.values(dishPopularity),
                    backgroundColor: colors,
                    hoverBackgroundColor: colors
                }
            ]
        }
    }
}
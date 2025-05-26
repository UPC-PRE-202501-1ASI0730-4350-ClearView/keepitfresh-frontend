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

export async function getCostDistribution() {
    const response = await axios.get('http://localhost:3000/purchases')
    const purchases = response.data

    // Agrupar costos por categoría
    const categoryTotals = {}

    purchases.forEach(p => {
        if (!categoryTotals[p.category]) categoryTotals[p.category] = 0
        categoryTotals[p.category] += p.cost
    })

    const labels = Object.keys(categoryTotals)
    const data = Object.values(categoryTotals)
    const colors = ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#FF7043']

    return {
        labels,
        datasets: [
            {
                data,
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }
        ]
    }
}

export async function getStockLevels() {
    const response = await axios.get('http://localhost:3000/supplies')
    const supplies = response.data

    const labels = supplies.map(s => s.name)
    const current = supplies.map(s => s.currentStock)
    const minimum = supplies.map(s => s.minStock)

    return {
        labels,
        datasets: [
            {
                label: 'Current Stock',
                data: current,
                borderColor: '#42A5F5',
                backgroundColor: '#42A5F550',
                tension: 0.4
            },
            {
                label: 'Minimum Required',
                data: minimum,
                borderColor: '#EF5350',
                backgroundColor: '#EF535050',
                borderDash: [5, 5],
                tension: 0.4
            }
        ]
    }
}



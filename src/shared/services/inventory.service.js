import axios from 'axios'

const API_URL = 'http://localhost:5109/api/v1/products'

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

export async function getExpirationStats() {
    const res = await axios.get('http://localhost:5109/api/v1/products')
    const now = new Date()

    const { expired, valid } = res.data.reduce(
        (acc, product) => {
            const expirationDate = new Date(product.expirationDate)
            if (expirationDate < now) acc.expired++
            else acc.valid++
            return acc
        },
        { expired: 0, valid: 0 }
    )

    return {
        labels: ['Expired', 'Valid'],
        datasets: [
            {
                label: 'Expiration Status',
                data: [expired, valid],
                backgroundColor: ['#e74c3c', '#2ecc71']
            }
        ]
    }
}

export async function getStockLevels() {
    try {
        const response = await axios.get('http://localhost:5109/api/v1/products')
        const products = response.data

        return {
            labels: products.map(p => p.name),
            datasets: [
                {
                    label: 'Stock Levels',
                    data: products.map(p => p.quantity),
                    backgroundColor: '#42A5F5',
                    borderWidth: 3,
                    borderColor: '#42A5F5',
                },
                {
                    label: 'Minimum Threshold',
                    data: products.map(p => 10),
                    backgroundColor: '#FF6384',
                    borderWidth: 3,
                    borderColor: '#FF6384',
                }
            ]
        }
    } catch (error) {
        console.error('Error fetching stock levels:', error)
        return {
            labels: [],
            datasets: []
        }
    }
}

export async function getSensorStatusStats() {
    const res = await axios.get('http://localhost:5109/api/v1/products')

    const { active, offline } = res.data.reduce((acc, p) => {
        const status = p.sensor?.status?.toLowerCase()
        if (status === 'active') acc.active++
        else if (status === 'offline') acc.offline++
        return acc
    }, { active: 0, offline: 0 })

    return {
        labels: ['Active', 'Offline'],
        datasets: [{
            label: 'Sensor Status',
            data: [active, offline],
            backgroundColor: ['#3498db', '#95a5a6']
        }]
    }
}
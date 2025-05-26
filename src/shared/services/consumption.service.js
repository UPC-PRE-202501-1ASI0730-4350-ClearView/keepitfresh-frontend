import axios from 'axios'

const API_URL = 'http://localhost:3000'

export async function getMonthlyConsumption() {
    const [suppliesRes, consumptionRes] = await Promise.all([
        axios.get(`${API_URL}/supplies`),
        axios.get(`${API_URL}/consumption`)
    ])

    const supplies = suppliesRes.data
    const consumption = consumptionRes.data

    // Agrupar por mes y supply
    const months = ['January', 'February', 'March', 'April', 'May']
    const datasets = supplies.map(supply => {
        const data = months.map(month => {
            const record = consumption.find(
                c => c.supplyId === supply.id && c.month === month
            )
            return record ? record.amount : 0
        })

        return {
            label: `${supply.name} (${supply.unit})`,
            backgroundColor: getColorForSupply(supply.name),
            data
        }
    })

    return {
        labels: months,
        datasets
    }
}

function getColorForSupply(name) {
    const colorMap = {
        Rice: '#42A5F5',
        Chicken: '#66BB6A',
        Oil: '#FFA726',
        Tomato: '#AB47BC',
        Cheese: '#FF7043'
    }
    return colorMap[name] || '#999999'
}

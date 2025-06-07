import axios from 'axios'

const API_URL = 'http://localhost:3000' // URL de tu JSON Server o backend

export async function login(email, password) {
    const response = await axios.get(`${API_URL}/users?email=${email}`)
    const user = response.data[0]
    if (!user) {
        throw new Error('User not found')
    }
    // Aquí deberías comparar la contraseña con hash real; para test simple:
    if (user.password !== password) {
        throw new Error('Invalid password')
    }
    return user
}

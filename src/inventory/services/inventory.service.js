import axios from 'axios';
import Inventory from '../models/inventory.entity.js'; // tu clase Inventory

const API_URL = '/api/inventory';

export default {
    async getAll() {
        const response = await axios.get(API_URL);
        return response.data.map(item => new Inventory(item));
    },

    async create(item) {
        const newItem = new Inventory(item);
        const response = await axios.post(API_URL, newItem);
        return new Inventory(response.data);
    }
};

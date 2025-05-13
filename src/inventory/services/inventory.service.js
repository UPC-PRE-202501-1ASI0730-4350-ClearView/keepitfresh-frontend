import axios from 'axios';
const API_URL = '/api/inventory';

export default {
    getAll() {
        return axios.get(API_URL).then(res => res.data);
    },
    create(item) {
        return axios.post(API_URL, item).then(res => res.data);
    },
};

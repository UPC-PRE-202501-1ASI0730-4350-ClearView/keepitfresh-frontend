import { defineStore } from 'pinia';
import inventoryService from '../services/inventory.service.js';

export const useInventoryStore = defineStore('inventory', {
    state: () => ({
        items: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchInventory() {
            this.loading = true;
            try {
                this.items = await inventoryService.getAll();
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async addItem(item) {
            try {
                const newItem = await inventoryService.create(item);
                this.items.push(newItem);
            } catch (error) {
                this.error = error;
            }
        },
    },
});

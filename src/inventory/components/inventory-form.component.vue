<script setup>
import { ref } from 'vue';
import { useInventoryStore } from '../services/store.service.js';
import Inventory from '../models/inventory.entity.js';

defineOptions({
  name: 'inventory-form'
});

const inventoryStore = useInventoryStore();

const item = ref({
  name: '',
  category: '',
  quantity: 0,
  unit: '',
  entryDate: '',
  expirationDate: ''
});

const handleSubmit = () => {
  const newItem = new Inventory(item.value);
  inventoryStore.addItem(newItem);

  item.value = {
    name: '',
    category: '',
    quantity: 0,
    unit: '',
    entryDate: '',
    expirationDate: ''
  };
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="item.name" placeholder="Name of product" required/>
    <input v-model="item.category" placeholder="Category" required/>
    <input v-model.number="item.quantity" type="number" placeholder="Quantity" required/>
    <input v-model="item.unit" placeholder="Unit (kg, l, etc)" required/>
    <label>Entry Date</label>
    <input v-model="item.entryDate" type="date"/>
    <label>Expiration Date</label>
    <input v-model="item.expirationDate" type="date"/>
    <button type="submit">Save</button>
  </form>
</template>

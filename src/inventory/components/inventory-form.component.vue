<script setup>
import { ref } from 'vue';
import { useInventoryStore } from '../services/store.service.js';

defineOptions({
  name: 'inventory-form'
})

const inventoryStore = useInventoryStore();
const item = ref({ name: '', quantity: 0 });

const handleSubmit = () => {
  inventoryStore.addItem(item.value);
  item.value = { name: '', quantity: 0 };
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="item.name" placeholder="Name of product" required />
    <input v-model.number="item.quantity" type="number" placeholder="Quantity" required />
    <button type="submit">Guardar</button>
  </form>
</template>


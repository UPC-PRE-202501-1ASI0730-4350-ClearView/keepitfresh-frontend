<script setup>
import { onMounted } from 'vue';
import { useInventoryStore } from '../services/store.service.js';

defineOptions({
  name: 'inventory-list'
})

const inventoryStore = useInventoryStore();
onMounted(() => {
  inventoryStore.fetchInventory();
});
const items = inventoryStore.items;
</script>

<template>
  <div>
    <h2>Inventory</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.quantity }}
      </li>
    </ul>
  </div>
</template>


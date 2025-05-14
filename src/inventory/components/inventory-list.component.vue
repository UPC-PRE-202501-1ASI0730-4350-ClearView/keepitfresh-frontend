<script setup>
import { onMounted, ref } from 'vue';
import inventoryService from '../services/inventory.service.js'; // Usamos el servicio directamente

defineOptions({
  name: 'inventory-list'
});

const items = ref([]);

onMounted(async () => {
  try {
    const data = await inventoryService.getAll();
    items.value = data;
  } catch (error) {
    console.error("Error:", error);
  }
});
</script>

<template>
  <div>
    <h2>Inventory</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <strong>{{ item.name }}</strong> ({{ item.category }})<br />
        Quantity: {{ item.quantity }} {{ item.unit }}<br />
        Entry: {{ item.entryDate }} - Expiration: {{ item.expirationDate }}<br />
        Status:
        <span :style="{ color: item.status === 'Expired' ? 'red' : item.status === 'Close to due' ? 'orange' : 'green' }">
          {{ item.status }}
        </span>
      </li>
    </ul>
  </div>
</template>

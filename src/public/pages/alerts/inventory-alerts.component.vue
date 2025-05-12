<script setup>
import {onMounted, ref} from "vue";
import { Message as PvMessage } from "primevue";

const notifications = ref([]);

const fetchNotifications = async () => {
  try {
    const response = await fetch('http://localhost:3000/inventory-notification');
    notifications.value = await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};


onMounted(() => {
  fetchNotifications();
});

</script>

<template>
  <div class="w-full">
    <h1>Inventory Alerts</h1>
    <!-- Contenedor de notificaciones -->
    <div class="message-container">
      <!-- Notificaciones de Inventario -->
        <pv-message
            v-for="notification in notifications"
            :key="notification.title"
            closable
            severity="error"
            icon="pi pi-exclamation-circle"
            @close ="notification.closed = true"
        >
          {{ notification.description }}
        </pv-message>
    </div>
  </div>
</template>

<style scoped>

</style>
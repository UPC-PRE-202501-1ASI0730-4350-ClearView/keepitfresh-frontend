<script setup>
import { ref, onMounted } from 'vue';
import { Button as PvButton, Message as PvMessage } from "primevue";

// Estado para controlar qué notificaciones mostrar
const activeNotifications = ref({
  stock: false,
  expiration: false
});

// Notificaciones cargadas desde la API
const notifications = ref([]);

// Función para obtener notificaciones desde la API
const fetchNotifications = async () => {
  try {
    const response = await fetch('http://localhost:3000/notifications');
    notifications.value = await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

// Función para mostrar/ocultar notificaciones por tipo
const toggleNotification = (type) => {
  activeNotifications.value[type] = !activeNotifications.value[type];
};

// Función para mostrar todas las notificaciones
const showAllNotifications = () => {
  for (const type in activeNotifications.value) {
    activeNotifications.value[type] = true;
  }
};

// Filtrar notificaciones por tipo
const getNotificationsByType = (type) => {
  return notifications.value.filter(notification => notification.type === type);
};

// Cargar notificaciones al montar el componente
onMounted(() => {
  fetchNotifications();
});
</script>

<template>
  <router-link to="/profile-details">
    <pv-button
        icon="pi pi-user"
        text
        class="absolute top-0 right-0 m-3"
        aria-label="Profile"
    />
  </router-link>
  <div class="alerts-container">
    <div class="content">
      <h2>Inventory Alerts</h2>

      <!-- Panel de control para pruebas -->
      <div class="test-controls">
        <pv-button
            v-for="type in ['stock', 'expiration']"
            :key="type"
            :label="type.toUpperCase()"
            @click="toggleNotification(type)"
            :severity="type"
            class="test-button"
        />
        <pv-button
            label="SHOW ALL"
            @click="showAllNotifications"
            severity="secondary"
        />
      </div>

      <!-- Contenedor de notificaciones -->
      <div class="message-container">

        <!-- Notificaciones de stock -->
        <template v-if="activeNotifications.stock">
          <pv-message
              v-for="notification in getNotificationsByType('stock')"
              :key="notification.id"
              closable
              severity="success"
              icon="pi pi-check-circle"
              @close="activeNotifications.success = false"
          >
            {{ notification.message }}
          </pv-message>
        </template>

        <!-- Notificaciones expiracion -->
        <template v-if="activeNotifications.expiration">
          <pv-message
              v-for="notification in getNotificationsByType('expiration')"
              :key="notification.id"
              closable
              severity="warn"
              icon="pi pi-exclamation-triangle"
              @close="activeNotifications.info = false"
          >
            {{ notification.message }}
          </pv-message>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

.test-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.content h2{
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 35px;
  font-weight: 700;
}
.test-button {
  min-width: 100px;
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 300px;
}

:deep(.p-message) {
  border-radius: 18px;
  opacity: 0.95;
  transition: all 0.3s ease;
  font-family: Arial, sans-serif;
  font-size: 12px;
}

:deep(.p-message:hover) {
  opacity: 1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
:deep(.p-button.p-button-stock){
  background-color: #62B965 !important;
  color: white !important;
  border: none !important;
}
:deep(.p-button.p-button-expiration){
  background-color: #E4C072 !important;
  color: white !important;
  border: none !important;
}
:deep(.p-button:hover){
  opacity: 1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
:deep(.p-button){
  border-radius: 18px !important;
  font-family: Arial, sans-serif !important;
  font-size: 14px !important;
}
</style>
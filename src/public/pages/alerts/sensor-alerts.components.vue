<script setup>
import { ref } from 'vue';
import {Button as PvButton, Message as PvMessage} from "primevue";

// Estado para controlar qué notificaciones mostrar
const activeNotifications = ref({
  error: false,
  warn: false,
  success: false,
  info: false
});

// Mensajes de ejemplo más descriptivos
const notificationMessages = {
  error: 'Sensor A: Temperatura CRÍTICA (45°C) - ¡Requiere acción inmediata!',
  warn: 'Sensor B: Batería baja (15%) - Reemplazar pronto',
  success: 'Sensor C: Reconexión exitosa - Operando normalmente',
  info: 'Sensor D: Actualización de firmware disponible',
};

// Función para mostrar/ocultar notificaciones
const toggleNotification = (type) => {
  activeNotifications.value[type] = !activeNotifications.value[type];
};

// Función para mostrar todas las notificaciones
const showAllNotifications = () => {
  for (const type in activeNotifications.value) {
    activeNotifications.value[type] = true;
  }
};
</script>

<template>
  <div class="alerts-container">
    <div class="content">
      <h2>Prueba de Notificaciones</h2>

      <!-- Panel de control para pruebas -->
      <div class="test-controls">
        <pv-button
            v-for="type in ['error', 'warn', 'success', 'info']"
            :key="type"
            :label="type.toUpperCase()"
            @click="toggleNotification(type)"
            :severity="type"
            class="test-button"
        />
        <pv-button
            label="MOSTRAR TODAS"
            @click="showAllNotifications"
            severity="secondary"
        />
      </div>

      <!-- Contenedor de notificaciones -->
      <div class="message-container">
        <pv-message
            v-if="activeNotifications.error"
            closable
            severity="error"
            icon="pi pi-exclamation-circle"
            @close="activeNotifications.error = false"
        >
          {{ notificationMessages.error }}
        </pv-message>

        <pv-message
            v-if="activeNotifications.warn"
            closable
            severity="warn"
            icon="pi pi-exclamation-triangle"
            @close="activeNotifications.warn = false"
        >
          {{ notificationMessages.warn }}
        </pv-message>

        <pv-message
            v-if="activeNotifications.success"
            closable
            severity="success"
            icon="pi pi-check-circle"
            @close="activeNotifications.success = false"
        >
          {{ notificationMessages.success }}
        </pv-message>

        <pv-message
            v-if="activeNotifications.info"
            closable
            severity="info"
            icon="pi pi-info-circle"
            @close="activeNotifications.info = false"
        >
          {{ notificationMessages.info }}
        </pv-message>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

.test-controls {
  margin-top: 5%;
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.content h2{
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 35px;
  font-weight: 700;
  color: black;
  margin: 0;
}
.test-button {
  min-width: 100px;
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 300px; /* Espacio reservado para ver las notificaciones */
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
:deep(.p-button.p-button-error){
  background-color: #CA4747 !important;
  color: white !important;
  border: none !important;
}
:deep(.p-button.p-button-success){
  background-color: #62B965 !important;
  color: white !important;
  border: none !important;
}
:deep(.p-button.p-button-warn){
  background-color: #E4C072 !important;
  color: white !important;
  border: none !important;
}
:deep(.p-button.p-button-info){
  background-color: #2F82DB !important;
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
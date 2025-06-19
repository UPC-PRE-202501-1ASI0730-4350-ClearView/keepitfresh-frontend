<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button as PvButton, Message as PvMessage } from 'primevue'

const { t } = useI18n()

const activeNotifications = ref({
  error: false,
  warn: false,
  success: false,
  info: false,
  stock: false,
  expiration: false
})

const notifications = ref([])

const fetchNotifications = async () => {
  try {
    const response = await fetch('http://localhost:3000/notifications')
    notifications.value = await response.json()
  } catch (error) {
    console.error('Error fetching notifications:', error)
  }
}

const toggleNotification = (type) => {
  activeNotifications.value[type] = !activeNotifications.value[type]
}

const showAllNotifications = () => {
  for (const type in activeNotifications.value) {
    activeNotifications.value[type] = true
  }
}

const getNotificationsByType = (type) => {
  return notifications.value.filter(notification => notification.type === type)
}

onMounted(fetchNotifications)
</script>

<template>
  <router-link to="/profile-details">
    <pv-button
        icon="pi pi-user"
        rounded
        text
        class="absolute top-0 right-0 m-3"
        aria-label="Profile"
        style="color: #AFD6FF; border-radius: 50%"
    />
  </router-link>

  <div class="alerts-container">
    <div class="content">
      <h2>{{ t('alertsSensors.title') }}</h2>

      <!-- Panel de control para pruebas -->
      <div class="test-controls">
        <pv-button
            v-for="type in ['error', 'warn', 'success', 'info', 'stock', 'expiration']"
            :key="type"
            :label="t(`alertsSensors.buttons.${type}`)"
            @click="toggleNotification(type)"
            :severity="type"
            class="test-button"
        />
        <pv-button
            :label="t('alertsSensors.buttons.all')"
            @click="showAllNotifications"
            severity="secondary"
        />
      </div>

      <!-- Contenedor de notificaciones -->
      <div class="message-container">
        <template v-for="type in Object.keys(activeNotifications)" :key="type">
          <template v-if="activeNotifications[type]">
            <pv-message
                v-for="notification in getNotificationsByType(type)"
                :key="notification.id"
                closable
                :severity="type"
                :icon="t(`alertsSensors.icons.${type}`, '')"
                @close="activeNotifications[type] = false"
            >
              {{ notification.message }}
            </pv-message>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

.alerts-container {
  padding: 1rem;
}

.test-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.content h2 {
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

:deep(.p-button.p-button-error) {
  background-color: #CA4747 !important;
  color: white !important;
  border: none !important;
}

:deep(.p-button.p-button-success) {
  background-color: #62B965 !important;
  color: white !important;
  border: none !important;
}

:deep(.p-button.p-button-warn) {
  background-color: #E4C072 !important;
  color: white !important;
  border: none !important;
}

:deep(.p-button.p-button-info) {
  background-color: #2F82DB !important;
  color: white !important;
  border: none !important;
}

:deep(.p-button:hover) {
  opacity: 1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

:deep(.p-button) {
  border-radius: 18px !important;
  font-family: Arial, sans-serif !important;
  font-size: 14px !important;
}
</style>

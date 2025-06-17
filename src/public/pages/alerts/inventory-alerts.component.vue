<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activeNotifications = ref({
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
        text
        class="absolute top-0 right-0 m-3"
        aria-label="Profile"
        style="color: #AFD6FF; border-radius: 50%"
    />
  </router-link>

  <div class="alerts-container">
    <div class="content">
      <h2>{{ $t('alerts.title') }}</h2>

      <div class="test-controls">
        <pv-button
            v-for="type in ['stock', 'expiration']"
            :key="type"
            :label="$t(`alerts.buttons.${type}`)"
            @click="toggleNotification(type)"
            :severity="type"
            class="test-button"
        />
        <pv-button
            :label="$t('alerts.buttons.all')"
            @click="showAllNotifications"
            severity="secondary"
        />
      </div>

      <div class="message-container">
        <template v-if="activeNotifications.stock">
          <pv-message
              v-for="notification in getNotificationsByType('stock')"
              :key="notification.id"
              closable
              severity="success"
              icon="pi pi-check-circle"
          >
            {{ notification.message }}
          </pv-message>
        </template>

        <template v-if="activeNotifications.expiration">
          <pv-message
              v-for="notification in getNotificationsByType('expiration')"
              :key="notification.id"
              closable
              severity="warn"
              icon="pi pi-exclamation-triangle"
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
:deep(.p-button.p-button-stock) {
  background-color: #62B965 !important;
  color: white !important;
  border: none !important;
}
:deep(.p-button.p-button-expiration) {
  background-color: #E4C072 !important;
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

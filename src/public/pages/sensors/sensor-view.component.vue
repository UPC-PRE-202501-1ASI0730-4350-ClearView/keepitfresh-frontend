<template>
  <router-link to="/profile-details">
    <pv-button
        icon="pi pi-user"
        rounded
        text
        class="absolute top-0 right-0 m-3"
        aria-label="Profile"
        style="color: #AFD6FF"
    />
  </router-link>
  <div class="sensor-management p-4">
    <h2 class="text-2xl font-bold text-center mb-4">Sensor Management</h2>
    <div class="grid">
      <div class="col-12 md:col-5">
        <SensorAssignment />
      </div>
      <div class="col-12 md:col-7">
        <SensorTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import SensorAssignment from './sensor-assignment.component.vue'
import SensorTable from './sensor-table.component.vue'
</script>

<style scoped>
.sensor-management {
  max-width: 100%;
  overflow-y: auto;
}

h2 {
  font-family: 'Roboto Condensed', sans-serif;
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

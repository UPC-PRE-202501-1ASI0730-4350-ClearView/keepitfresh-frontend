<template>
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
}

h2 {
  font-family: 'Roboto Condensed', sans-serif;
}
</style>

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
  <div class="p-4 statistics-container">
    <h2 class="text-3xl font-bold text-center text-white mb-6">
      {{ $t('statistics.dashboard.title') }}
    </h2>
    <div class="sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 graphs">
      <div class="bg-[#1e293b] rounded-xl p-5 shadow-lg col-span-2">
        <StockLevelChart />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div class="bg-[#1e293b] rounded-xl p-5 shadow-lg w-full h-[30rem]">
          <ExpirationStatistics />
        </div>

        <div class="bg-[#1e293b] rounded-xl p-5 shadow-lg w-full h-[30rem]">
          <SensorStatusChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


import { useI18n } from 'vue-i18n'

import StockLevelChart from './stock-level-statistics.component.vue'
import ExpirationStatistics from './expiration-statistics.component.vue'
import SensorStatusChart from './sensor-status-statistics.component.vue'

const { t } = useI18n()
</script>

<style scoped>
h2 {
  font-family: 'Roboto Condensed', sans-serif;
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

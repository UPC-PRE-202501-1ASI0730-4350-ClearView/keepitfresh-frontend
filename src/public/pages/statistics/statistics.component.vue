<template>
  <div class="p-4">
    <h2 class="text-3xl font-bold text-center text-white mb-6">Supply Analytics Dashboard</h2>
    <div class="sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 graphs">
      <div class="bg-[#1e293b] rounded-xl p-5 shadow-lg">
        <MonthlyConsumptionChart />
      </div>
      <div class="bg-[#1e293b] rounded-xl p-5 shadow-lg col-span-2">
        <StockLevelChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import MonthlyConsumptionChart from './monthly-consumption-statistics.component.vue'
import StockLevelChart from './stock-level-statistics.component.vue'
</script>

<style scoped>
h2{
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
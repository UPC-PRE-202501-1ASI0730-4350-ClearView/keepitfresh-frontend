<template>
  <pv-card>
    <template #title>
      <h3>Monthly Consumption by Supply</h3>
    </template>
    <template #content>
      <pv-chart type="bar" :data="chartData" :options="chartOptions" class="w-full h-28rem md:h-70rem"/>
    </template>
  </pv-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'primevue/chart'
import {getMonthlyConsumption} from "../../../shared/services/consumption.service.js";

const chartData = ref(null)
const chartOptions = ref({})

onMounted(async () => {
  chartData.value = await getMonthlyConsumption()

  chartOptions.value = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  }
})
</script>

<style scoped>
.h-30rem {
  height: 30rem;
}
h3 {
  font-family: 'Roboto Condensed', sans-serif;
}
</style>

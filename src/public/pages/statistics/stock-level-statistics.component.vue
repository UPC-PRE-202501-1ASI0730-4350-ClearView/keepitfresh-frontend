<template>
  <pv-card>
    <template #title>
      <h3>
        Stock Levels vs Minimum Threshold
      </h3>
    </template>
    <template #content>
      <pv-chart type="line" :data="chartData" :options="chartOptions" class="w-full h-28rem md:h-32rem"/>
    </template>
  </pv-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {getStockLevels} from "../../../shared/services/inventory.service.js";

const chartData = ref(null)
const chartOptions = ref({})

onMounted(async () => {
  chartData.value = await getStockLevels()

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
      y: {
        beginAtZero: true,
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      x: {
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
.h-25rem {
  height: 25rem;
}
h3{
  font-family: "Roboto Condensed", sans-serif;
}
</style>

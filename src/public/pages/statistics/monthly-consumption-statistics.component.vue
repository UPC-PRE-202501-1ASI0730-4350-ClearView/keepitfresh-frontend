<template>
  <pv-card>
    <template #title>
      <h3>Monthly Consumption by Supply</h3>
    </template>
    <template #content>
      <pv-chart type="bar" :data="chartData" :options="chartOptions" class="w-full h-28rem md:h-70rem"/>
      <div class="flex justify-content-end mb-2">
        <pv-button label="Export" icon="pi pi-download" @click="exportMonthlyCSV" class="p-button-sm p-button-success" style="background-color: #AFD6FF; border-color: #AFD6FF"/>
      </div>
    </template>
  </pv-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'primevue/chart'
import {getMonthlyConsumption} from "../../../shared/services/consumption.service.js";
import Papa from 'papaparse'
import {Button as PvButton} from "primevue";

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

const exportMonthlyCSV = async () => {
  const data = await getMonthlyConsumption()
  const csv = Papa.unparse(data.datasets[0].data.map((val, i) => ({
    Month: data.labels[i],
    Consumption: val
  })))

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'monthly_consumption.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.h-30rem {
  height: 30rem;
}
h3 {
  font-family: 'Roboto Condensed', sans-serif;
}
</style>

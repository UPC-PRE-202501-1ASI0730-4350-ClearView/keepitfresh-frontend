<template>
  <pv-card>
    <template #title>
      <h3>Monthly Consumption by Supply</h3>
    </template>
    <template #content>
      <pv-chart id="monthly-consumption-chart" type="bar" :data="chartData" :options="chartOptions" class="w-full h-28rem md:h-70rem"/>
      <div class="flex justify-end gap-2 mb-2">
        <pv-button
            label="Export CSV"
            icon="pi pi-file-o"
            @click="exportMonthlyCSV"
            class="p-button-sm p-button-success"
            style="background-color: #62B965; border-color: #62B965"
        />
        <pv-button
            label="Export PDF"
            icon="pi pi-file-pdf"
            @click="exportMonthlyPDF"
            class="p-button-sm p-button-success"
            style="background-color: #CA4747; border-color: #CA4747"
        />
      </div>
    </template>
  </pv-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const exportMonthlyPDF = async () => {
  const chartElement = document.getElementById('monthly-consumption-chart')
  if (!chartElement) return

  const canvas = await html2canvas(chartElement, {
    backgroundColor: '#ffffff'
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('landscape', 'mm', 'a4')

  const imgProps = pdf.getImageProperties(imgData)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

  pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight)
  pdf.save('monthly_consumption.pdf')
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

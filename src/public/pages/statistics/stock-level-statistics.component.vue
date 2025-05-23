<template>
  <pv-card>
    <template #title>
      <h3>
        Stock Levels vs Minimum Threshold
      </h3>
    </template>
    <template #content>
      <pv-chart id="stock-level-chart" type="line" :data="chartData" :options="chartOptions" class="w-full h-28rem md:h-32rem"/>
      <div class="flex justify-end gap-2 mb-2">
        <pv-button
            label="Export CSV"
            icon="pi pi-file-o"
            @click="exportStockLevelCSV"
            class="p-button-sm p-button-success"
            style="background-color: #62B965; border-color: #62B965"
        />
        <pv-button
            label="Export PDF"
            icon="pi pi-file-pdf"
            @click="exportStockLevelPDF"
            class="p-button-sm p-button-success"
            style="background-color: #CA4747; border-color: #CA4747"
        />
      </div>
    </template>
  </pv-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {getStockLevels} from "../../../shared/services/inventory.service.js";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Papa from 'papaparse';

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

const exportStockLevelPDF = async () => {
  const chartElement = document.getElementById('stock-level-chart')

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
  pdf.save('stock-level.pdf')
}

const exportStockLevelCSV = async () => {
  // Usa los datos que ya tienes en chartData
  const data = chartData.value
  if (!data || !data.datasets || !data.datasets[0]) return

  const csvData = data.datasets[0].data.map((value, index) => ({
    Supply: data.labels[index],
    Quantity: value
  }))

  const csv = Papa.unparse(csvData)

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'stock-level.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

</script>

<style scoped>
.h-25rem {
  height: 25rem;
}
h3{
  font-family: "Roboto Condensed", sans-serif;
}
</style>

<template>
  <pv-card>
    <template #title>
      <h3>Expiration Status</h3>
    </template>
    <template #content>
      <pv-chart
          id="expiration-status-chart"
          type="doughnut"
          :data="chartData"
          :options="chartOptions"
          class="w-full h-28rem"
      />
      <div class="flex justify-end gap-2 mb-2">
        <pv-button
            label="Export CSV"
            icon="pi pi-file-o"
            @click="exportCSV"
            class="p-button-sm p-button-success"
            style="background-color: #62B965; border-color: #62B965; margin-top: 1rem"
        />
        <pv-button
            label="Export PDF"
            icon="pi pi-file-pdf"
            @click="exportPDF"
            class="p-button-sm p-button-success"
            style="background-color: #CA4747; border-color: #CA4747; margin-top: 1rem"
        />
      </div>
    </template>
  </pv-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getExpirationStats } from '/src/shared/services/inventory.service.js'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Papa from "papaparse";

const chartData = ref(null)
const chartOptions = ref({
  plugins: {
    legend: {
      labels: {
        font: {
          size: 14
        }
      }
    }
  }
})

onMounted(async () => {
  chartData.value = await getExpirationStats()
})

const exportPDF = async () => {
  const chartElement = document.getElementById('expiration-status-chart')

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
  pdf.save('expiration-status.pdf')
}

const exportCSV = async () => {
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
  link.setAttribute('download', 'expiration-status.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
h3 {
  font-family: 'Roboto Condensed', sans-serif;
}
</style>

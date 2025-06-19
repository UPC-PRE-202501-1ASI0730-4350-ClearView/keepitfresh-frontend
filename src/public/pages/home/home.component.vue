<template>
  <div class="home-container">
    <div class="content-wrapper p-6">
      <h1 class="text-2xl font-bold mb-2 text-center">{{ $t('dashboard.greeting') }}</h1>
      <p class="text-gray-600 mb-4 text-center">{{ $t('dashboard.description') }}</p>

      <div class="grid gap-4 md:grid-cols-3 justify-items-center">
        <!-- Productos por vencer -->
        <pv-card style="border-radius: 18px; width: 100%; max-width: 350px">
          <template #title>{{ $t('dashboard.expiringProducts') }}</template>
          <template #content>
            <ul class="space-y-2">
              <li v-for="item in soonExpiring" :key="item.id">
                <strong>{{ item.name }}</strong><br />
                <small class="text-gray-500">{{ $t('dashboard.expires') }}: {{ new Date(item.expirationDate).toLocaleDateString() }}</small>
              </li>
              <li v-if="!soonExpiring.length" class="text-gray-500">{{ $t('dashboard.emptyExpiring') }}</li>
            </ul>
          </template>
        </pv-card>

        <!-- Resumen visual -->
        <pv-card style="border-radius: 18px; width: 100%; max-width: 350px">
          <template #title>{{ $t('dashboard.visualSummary') }}</template>
          <template #content>
            <pv-chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full" />
            <div class="mt-2 text-center">
              <span class="font-semibold text-xl">{{ $t('dashboard.productsCount', { count: totalProducts }) }}</span>
            </div>
          </template>
        </pv-card>

        <!-- Productos recientes -->
        <pv-card style="border-radius: 18px; width: 100%; max-width: 350px">
          <template #title>{{ $t('dashboard.addedProducts') }}</template>
          <template #content>
            <ul class="space-y-2">
              <li v-for="item in recentProducts" :key="item.id">
                <strong>{{ item.name }}</strong><br />
                <small class="text-gray-500">{{ $t('dashboard.addedOn') }} {{ new Date(item.createdAt).toLocaleDateString() }}</small>
              </li>
              <li v-if="!recentProducts.length" class="text-gray-500">{{ $t('dashboard.emptyRecent') }}</li>
            </ul>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getProducts } from '/src/shared/services/inventory.service.js'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement)

const { t } = useI18n()

const products = ref([])
const soonExpiring = ref([])
const recentProducts = ref([])
const chartData = ref({ labels: [], datasets: [] })
const chartOptions = ref({ plugins: { legend: { display: false } } })
const totalProducts = ref(0)

function processProducts(data) {
  const today = new Date()
  const sevenDays = 1000 * 60 * 60 * 24 * 7

  // Por vencer
  soonExpiring.value = data.filter(p => new Date(p.expirationDate) - today <= sevenDays)

  // Más recientes
  recentProducts.value = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)

  // Gráfico por categoría
  const countMap = {}
  data.forEach(p => {
    countMap[p.category] = (countMap[p.category] || 0) + 1
  })
  chartData.value = {
    labels: Object.keys(countMap),
    datasets: [{
      data: Object.values(countMap),
      backgroundColor: ['#4ecdc4', '#ff6b35', '#a0aec0', '#ffd166', '#06d6a0']
    }]
  }

  totalProducts.value = data.length
}

onMounted(async () => {
  const res = await getProducts()
  products.value = res.data
  processProducts(products.value)
})
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  font-family: 'Roboto Condensed', sans-serif;
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
}

p {
  font-family: 'Arial', sans-serif;
}
</style>

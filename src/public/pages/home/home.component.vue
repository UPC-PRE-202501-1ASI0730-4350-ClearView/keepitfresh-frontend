<template>
  <router-link to="/profile-details">
    <pv-button
        icon="pi pi-user"
        text
        class="absolute top-0 right-0 m-3"
        aria-label="Profile"
        style="color: #AFD6FF"
    />
  </router-link>
  <div class="home-container">
    <div class="content-wrapper p-6">
      <h1 class="text-2xl font-bold mb-2 text-center">¡Hola {{}}!</h1>
      <p class="text-gray-600 mb-4 text-center">Esto está pasando con tus productos:</p>

      <div class="grid gap-4 md:grid-cols-3 justify-items-center">
        <!-- Próximos en vencer -->
        <pv-card style="border-radius: 18px; width: 100%; max-width: 350px">
          <template #title>Productos por vencer</template>
          <template #content>
            <ul class="space-y-2">
              <li v-for="item in soonExpiring" :key="item.id">
                <strong>{{ item.name }}</strong><br />
                <small class="text-gray-500">Vence: {{ new Date(item.expirationDate).toLocaleDateString() }}</small>
              </li>
              <li v-if="!soonExpiring.length" class="text-gray-500">Sin productos por vencer</li>
            </ul>
          </template>
        </pv-card>

        <!-- Resumen visual -->
        <pv-card style="border-radius: 18px; width: 100%; max-width: 350px">
          <template #title>Resumen visual</template>
          <template #content>
            <pv-chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full" />
            <div class="mt-2 text-center">
              <span class="font-semibold text-xl">{{ totalProducts }}</span> productos
            </div>
          </template>
        </pv-card>

        <!-- Actividad reciente -->
        <pv-card style="border-radius: 18px; width: 100%; max-width: 350px">
          <template #title>Productos añadidos</template>
          <template #content>
            <ul class="space-y-2">
              <li v-for="item in recentProducts" :key="item.id">
                <strong>{{ item.name }}</strong><br />
                <small class="text-gray-500">Agregado el {{ new Date(item.createdAt).toLocaleDateString() }}</small>
              </li>
              <li v-if="!recentProducts.length" class="text-gray-500">No hay productos recientes</li>
            </ul>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProducts } from '/src/shared/services/inventory.service.js'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement)

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

:deep(.p-button){
  border-radius: 18px !important;
  font-family: Arial, sans-serif !important;
  font-size: 14px !important;
}
</style>

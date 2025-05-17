<template>
  <div class="sensor-table">
    <h2>Products with Assigned Sensors</h2>
    <pv-data-table
        :value="products"
        dataKey="id"
        responsiveLayout="scroll"
    >
      <pv-column header="Image" style="width: 120px">
        <template #body="{ data }">
          <img :src="data.image" alt="Product" class="product-image" />
        </template>
      </pv-column>

      <pv-column field="name" header="Product" />
      <pv-column field="category" header="Category" />
      <pv-column field="sensor.type" header="Sensor Type" />
      <pv-column field="sensor.status" header="Status" />

      <pv-column header="Actions" style="text-align: center; width: 140px">
        <template #body="{ data }">
          <pv-button
              icon="pi pi-pencil"
              text
              rounded
              @click="editSensor(data)"
          />
        </template>
      </pv-column>
    </pv-data-table>

    <SensorEditDialog
        :product="selectedProduct"
        :visible="showDialog"
        @update:visible="showDialog = $event"
        @updated="loadProducts"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProducts } from '/src/shared/services/inventory.service.js'
import SensorEditDialog from './sensor-edit.component.vue'

const products = ref([])
const selectedProduct = ref(null)
const showDialog = ref(false)

function editSensor(product) {
  selectedProduct.value = { ...product }
  showDialog.value = true
}

async function loadProducts() {
  const res = await getProducts()
  products.value = res.data.filter(p => p.sensor)
}

onMounted(loadProducts)
</script>

<style scoped>
.sensor-table {
  padding: 1rem;
  max-width: 100%;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

h2 {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>

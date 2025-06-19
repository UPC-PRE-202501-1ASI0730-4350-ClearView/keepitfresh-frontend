<template>
  <div class="sensor-assignment">
    <h2>{{ $t('sensors.assignment.title') }}</h2>
    <div v-if="products.length" class="grid">
      <div
          v-for="product in products"
          :key="product.id"
          class="col-12 md:col-6 lg:col-4"
      >
        <div class="p-3 border-round shadow-2 surface-card" style="border-radius: 18px">
          <img :src="product.image" alt="Product image" class="assignment-image" />
          <div class="mt-2 text-center font-bold" style="font-family: 'Roboto Condensed', sans-serif">
            {{ product.name }}
          </div>

          <div v-if="assignedSensors[product.id]" class="mt-3">
            <label style="font-family: Arial, sans-serif">{{ $t('sensors.assignment.sensorType') }}</label>
            <pv-dropdown
                v-model="assignedSensors[product.id].type"
                :options="sensorTypes"
                :placeholder="$t('sensors.assignment.selectType')"
                class="w-full mb-2"
                style="font-family: Arial, sans-serif"
            />

            <label style="font-family: Arial, sans-serif">{{ $t('sensors.assignment.status') }}</label>
            <pv-dropdown
                v-model="assignedSensors[product.id].status"
                :options="statusOptions"
                :placeholder="$t('sensors.assignment.selectStatus')"
                class="w-full mb-2"
                style="font-family: Arial, sans-serif"
            />

            <pv-button
                :label="$t('sensors.assignment.assign')"
                icon="pi pi-save"
                class="w-full"
                @click="assignSensor(product.id)"
                style="background-color: #AFD6FF; border-color: #AFD6FF"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-products">{{ $t('sensors.assignment.noProducts') }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getProducts, updateProduct } from '/src/shared/services/inventory.service.js'

const { t } = useI18n()

const products = ref([])
const assignedSensors = ref({})

const sensorTypes = ['Temperature', 'Humidity', 'CO2', 'Motion', 'Light', 'Weight']
const statusOptions = ['active', 'offline', 'maintenance']

async function loadProducts() {
  const res = await getProducts()
  const unassigned = res.data.filter(p => !p.sensor)
  products.value = unassigned

  assignedSensors.value = {}
  for (const product of unassigned) {
    assignedSensors.value[product.id] = {
      type: '',
      status: 'active'
    }
  }
}

async function assignSensor(productId) {
  const product = products.value.find(p => p.id === productId)
  const sensor = assignedSensors.value[productId]

  if (!sensor.type || !sensor.status) return

  const updatedProduct = {
    ...product,
    sensor: {
      id: `S-${productId}`,
      type: sensor.type,
      status: sensor.status
    }
  }

  await updateProduct(productId, updatedProduct)
  await loadProducts()
}

onMounted(loadProducts)
</script>

<style scoped>
.sensor-assignment {
  padding: 1rem;
}

.assignment-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

h2 {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.no-products {
  text-align: center;
  font-size: 1rem;
  color: #999;
  margin-top: 2rem;
  font-family: 'Arial', sans-serif;
}
</style>

<template>
  <pv-dialog
      :visible="visible"
      @update:visible="emit('update:visible', $event)"
      header="Edit Sensor"
      modal
      :style="{ width: '400px' }"
      :closable="true"
  >
    <div class="formgrid grid p-fluid">
      <div class="field col-12">
        <label for="sensorType">Sensor Type</label>
        <pv-dropdown
            id="sensorType"
            v-model="localSensor.type"
            :options="sensorTypes"
            placeholder="Select type"
            class="w-full"
        />
      </div>
      <div class="field col-12">
        <label>Status</label>
        <pv-dropdown
            v-model="localSensor.status"
            :options="['active', 'offline', 'maintenance']"
            placeholder="Select status"
            class="w-full"
        />
      </div>
    </div>

    <template #footer>
      <pv-button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
      <pv-button label="Save" icon="pi pi-check" @click="saveSensor" />
    </template>
  </pv-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { updateProduct } from '/src/shared/services/inventory.service.js'

const props = defineProps({
  product: Object,
  visible: Boolean
})
const emit = defineEmits(['update:visible', 'updated'])

const localSensor = ref({ id: '', type: '', status: '' })
const sensorTypes = ['Temperature', 'Humidity', 'CO2', 'Motion', 'Light', 'Weight']

watch(() => props.product, (product) => {
  if (product?.sensor) {
    localSensor.value = { ...product.sensor }
  }
}, { immediate: true })

function closeDialog() {
  emit('update:visible', false)
}

async function saveSensor() {
  const updated = {
    ...props.product,
    sensor: {
      ...props.product.sensor,
      type: localSensor.value.type,
      status: localSensor.value.status
    }
  }
  await updateProduct(props.product.id, updated)
  emit('updated')
  closeDialog()
}
</script>

<style scoped>
label {
  font-weight: 600;
}
</style>

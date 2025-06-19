<template>
  <pv-dialog
      :visible="visible"
      @update:visible="emit('update:visible', $event)"
      :header="t('sensorEdit.title')"
      modal
      :style="{ width: '400px' }"
      :closable="true"
  >
    <div class="formgrid grid p-fluid">
      <div class="field col-12">
        <label for="sensorType">{{ t('sensorEdit.typeLabel') }}</label>
        <pv-dropdown
            id="sensorType"
            v-model="localSensor.type"
            :options="sensorTypesTranslated"
            :placeholder="t('sensorEdit.selectType')"
            class="w-full"
        />
      </div>
      <div class="field col-12">
        <label>{{ t('sensorEdit.statusLabel') }}</label>
        <pv-dropdown
            v-model="localSensor.status"
            :options="statusOptionsTranslated"
            :placeholder="t('sensorEdit.selectStatus')"
            class="w-full"
        />
      </div>
    </div>

    <template #footer>
      <pv-button :label="t('sensorEdit.cancel')" icon="pi pi-times" severity="secondary" @click="closeDialog" />
      <pv-button :label="t('sensorEdit.save')" icon="pi pi-check" @click="saveSensor" />
    </template>
  </pv-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { updateProduct } from '/src/shared/services/inventory.service.js'

const { t } = useI18n()

const props = defineProps({
  product: Object,
  visible: Boolean
})
const emit = defineEmits(['update:visible', 'updated'])

const localSensor = ref({ id: '', type: '', status: '' })

// Traducción de las opciones de tipo de sensor
const rawSensorTypes = ['Temperature', 'Humidity', 'CO2', 'Motion', 'Light', 'Weight']
const sensorTypesTranslated = computed(() =>
    rawSensorTypes.map(type => ({ label: t(`sensorEdit.types.${type}`), value: type }))
)

// Traducción de estados
const rawStatuses = ['active', 'offline', 'maintenance']
const statusOptionsTranslated = computed(() =>
    rawStatuses.map(status => ({ label: t(`sensorEdit.statuses.${status}`), value: status }))
)

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

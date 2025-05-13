<script setup>
import InventoryForm from '../components/inventory-form.component.vue'
import InventoryList from '../components/inventory-list.component.vue'

defineOptions({
  name: 'inventory-view'
})
</script>

<template>
  <div>
    <InventoryForm />
    <InventoryList />
  </div>
</template>

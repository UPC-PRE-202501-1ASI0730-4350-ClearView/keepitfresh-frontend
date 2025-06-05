<script setup>
import { ref, onMounted } from 'vue'
import { deleteOrder, getOrders, updateOrderStatus, getOrdersByStatus } from '/src/shared/services/orders.service.js'

const orders = ref([])
const selectedStatus = ref(null)

const statusOptions = [
  { label: 'All Orders', value: null },
  { label: 'Pending', value: 'Pending' },
  { label: 'Preparing', value: 'Preparing' },
  { label: 'Ready', value: 'Ready' },
  { label: 'Completed', value: 'Completed' }
]

async function loadOrders() {
  const res = await getOrders()
  orders.value = res.data
}

async function filterByStatus() {
  if (selectedStatus.value) {
    const res = await getOrdersByStatus(selectedStatus.value)
    orders.value = res.data
  } else {
    await loadOrders()
  }
}

async function handleDelete(id) {
  if (confirm('Are you sure you want to delete this order?')) {
    await deleteOrder(id)
    await loadOrders()
  }
}

async function updateStatus(id, newStatus) {
  await updateOrderStatus(id, newStatus)
  await loadOrders()
}

function getStatusClass(status) {
  const statusMap = {
    'Pending': 'status-pending',
    'Preparing': 'status-preparing',
    'Ready': 'status-ready',
    'Completed': 'status-completed'
  }
  return statusMap[status] || 'status-pending'
}

function getNextStatus(currentStatus) {
  const statusFlow = {
    'Pending': 'Preparing',
    'Preparing': 'Ready',
    'Ready': 'Completed'
  }
  return statusFlow[currentStatus] || 'Preparing'
}

function getNextStatusLabel(currentStatus) {
  const labelMap = {
    'Pending': 'Start Preparing',
    'Preparing': 'Mark Ready',
    'Ready': 'Complete Order'
  }
  return labelMap[currentStatus] || 'Update Status'
}

function getNextStatusSeverity(currentStatus) {
  const severityMap = {
    'Pending': 'warning',
    'Preparing': 'info',
    'Ready': 'success'
  }
  return severityMap[currentStatus] || 'secondary'
}

function formatTime(timestamp) {
  if (!timestamp) return 'Unknown'
  return new Date(timestamp).toLocaleString()
}

onMounted(loadOrders)
</script>


<template>

</template>

<style scoped>

</style>
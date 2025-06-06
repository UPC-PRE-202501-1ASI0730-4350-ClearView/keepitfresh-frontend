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
  <router-link to="/profile-details">
    <pv-button
        icon="pi pi-user"
        rounded
        text
        class="absolute top-0 right-0 m-3"
        aria-label="Profile"
    />
  </router-link>
  <div class="order-list">
    <h1>All Orders</h1>

    <!-- Status Filter -->
    <div class="filter-section mb-4">
      <pv-select
          v-model="selectedStatus"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Filter by status"
          class="status-filter"
          @change="filterByStatus"
      />
    </div>

    <div v-if="orders.length" class="grid">
      <div
          v-for="order in orders"
          :key="order.id"
          class="col-12 sm:col-6 md:col-4 lg:col-3"
      >
        <div class="p-3 border-round shadow-2 surface-card">
          <div class="order-header">
            <div class="table-info">
              <strong>Table {{ order.tableNumber }}</strong>
            </div>
            <div class="status-badge" :class="getStatusClass(order.status)">
              {{ order.status || 'Pending' }}
            </div>
          </div>

          <div class="mt-3 text-left content">
            <div class="order-time">
              <strong>Time:</strong> {{ formatTime(order.createdAt) }}
            </div>
            <div class="dishes-list">
              <strong>Dishes:</strong>
              <ul>
                <li v-for="dish in order.dishes" :key="dish.name">
                  {{ dish.quantity }}x {{ dish.name }}
                </li>
              </ul>
            </div>
            <div class="total-amount">
              <strong>Total: S/ {{ order.total?.toFixed(2) || '0.00' }}</strong>
            </div>
          </div>

          <div class="mt-3 flex justify-content-between">
            <pv-button
                v-if="order.status !== 'Completed'"
                :label="getNextStatusLabel(order.status)"
                :severity="getNextStatusSeverity(order.status)"
                size="small"
                @click="updateStatus(order.id, getNextStatus(order.status))"
            />
            <pv-button
                icon="pi pi-trash"
                severity="danger"
                rounded
                text
                aria-label="Delete"
                @click="handleDelete(order.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="message">No orders found.</div>
  </div>
</template>

<style scoped>

</style>
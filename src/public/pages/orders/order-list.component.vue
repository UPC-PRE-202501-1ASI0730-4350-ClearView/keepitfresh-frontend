<script setup>
import { ref, onMounted } from 'vue'
import { deleteOrder, getOrders } from '/src/shared/services/orders.service.js'

const orders = ref([])


async function loadOrders() {
  const res = await getOrders()
  orders.value = res.data
}


async function handleDelete(id) {
  if (confirm('Are you sure you want to delete this order?')) {
    await deleteOrder(id)
    await loadOrders()
  }
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

    <div v-if="orders.length" class="grid">
      <div
          v-for="order in orders"
          :key="order.id"
          class="col-12 sm:col-6 md:col-4 lg:col-3"
      >
        <div class="p-3 border-round shadow-2 surface-card">
          <div class="order-header">
            <div class="table-info">
              <strong>Table {{ order.name }}</strong>
            </div>
          </div>

          <div class="mt-3 text-left content">
            <div class="dishes-info">
              <strong>Dishes:</strong>
              <p class="mt-1">{{ order.dishes }}</p>
            </div>
            <div class="total-amount">
              <strong>Total: S/ {{ order.price?.toFixed(2) || '0.00' }}</strong>
            </div>
          </div>

          <div class="mt-3 flex justify-content-end">
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
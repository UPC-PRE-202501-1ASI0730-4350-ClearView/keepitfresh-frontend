<template>
  <div class="product-list">
    <h1>Registered Products</h1>
    <div v-if="products.length" class="grid">
      <div
          v-for="product in products"
          :key="product.id"
          class="col-12 sm:col-6 md:col-4 lg:col-3"
      >
        <div class="p-3 border-round shadow-2 surface-card text-center">
          <img
              :src="product.image"
              alt="Product image"
              class="product-image"
          />
          <div class="mt-3 text-left content">
            <div><strong>Name:</strong> {{ product.name }}</div>
            <div><strong>Category:</strong> {{ product.category }}</div>
            <div><strong>Quantity:</strong> {{ product.quantity }}</div>
            <div><strong>Price:</strong> ${{ product.price }}</div>
            <div><strong>Expires:</strong> {{ new Date(product.expirationDate).toLocaleDateString() }}</div>
          </div>
          <div class="mt-3">
            <pv-button
                icon="pi pi-trash"
                severity="danger"
                rounded
                text
                aria-label="Delete"
                @click="handleDelete(product.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="message">No products found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { deleteProduct, getProducts } from '/src/shared/services/inventory.service.js'

const products = ref([])

async function loadProducts() {
  const res = await getProducts()
  products.value = res.data
}

async function handleDelete(id) {
  await deleteProduct(id)
  await loadProducts()
}

onMounted(loadProducts)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

.product-list {
  padding: 1rem;
}

h1 {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 2rem;
  text-align: center;
}

.message {
  font-family: 'Arial', sans-serif;
  color: #6B7280;
  text-align: center;
  margin-top: 2rem;
}

.content {
  font-family: 'Arial', sans-serif;
}

.product-image {
  width: 100%;
  max-width: 250px;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 18px;
  margin: 0 auto;
  display: block;
}
:deep(.surface-card){
  border-radius: 18px !important;
}
</style>
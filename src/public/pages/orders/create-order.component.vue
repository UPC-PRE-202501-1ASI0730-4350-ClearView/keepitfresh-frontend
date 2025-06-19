<script setup>
import { ref } from 'vue'
import { createOrder } from '/src/shared/services/orders.service.js'

const form = ref({
  name: '',
  dishes: '',
  price: null
})

function resetForm() {
  form.value = {
    name: '',
    dishes: '',
    price: null
  }
}

async function submitOrder() {
  try {
    console.log('Submit order:', form.value)

    if (!form.value.name.trim()) {
      alert('Please enter the name of the table')
      return
    }

    if (!form.value.dishes.trim()) {
      alert('Please enter the dishes')
      return
    }

    if (!form.value.price || form.value.price <= 0) {
      alert('Please enter a valid price')
      return
    }

    const orderData = {
      name: form.value.name,
      dishes: form.value.dishes,
      price: form.value.price,
    }

    await createOrder(orderData)

    alert('Order created successfully!')
    resetForm()
  } catch (error) {
    console.error('Error creating order:', error)
    alert('Error creating order. Please try again.')
  }
}

</script>

<template>
  <div class="page-container">
    <router-link to="/profile-details">
      <pv-button
          icon="pi pi-user"
          rounded
          text
          class="absolute top-0 right-0 m-3"
          aria-label="Profile"
      />
    </router-link>
    <div class="form-wrapper">
      <h2 class="form-title">Create New Order</h2>

      <div class="grid formgrid p-fluid">
        <!-- Form Fields -->
        <div class="col-12">
          <div class="formgrid grid">
            <div class="field col-12">
              <label for="name">Table Name</label>
              <pv-input-text
                  id="name"
                  v-model="form.name"
                  placeholder="Enter Table name"
                  class="w-full"
              />
            </div>

            <div class="field col-12">
              <label for="dishes">Dishes</label>
              <pv-textarea
                  id="dishes"
                  v-model="form.dishes"
                  placeholder="Enter dishes (e.g., 2x Grilled Chicken, 1x Caesar Salad)"
                  class="w-full"
                  rows="3"
              />
            </div>

            <div class="field col-12">
              <label for="price">Price (S/)</label>
              <pv-input-number
                  id="price"
                  v-model="form.price"
                  placeholder="Enter total price"
                  class="w-full"
                  :min="0"
                  :step="0.01"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
              />
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="col-12 mt-4 flex justify-content-center gap-3">
          <pv-button label="Cancel" severity="secondary" class="px-5" @click="resetForm"/>
          <pv-button
              label="Save Order"
              icon="pi pi-check"
              class="px-5 save-order-btn"
              @click="submitOrder"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
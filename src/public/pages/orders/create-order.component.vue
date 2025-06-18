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
              <label for="tableNumber">Table Number</label>
              <pv-input-number
                  id="tableNumber"
                  v-model="form.tableNumber"
                  placeholder="Enter table number"
                  class="w-full"
                  :min="1"
              />
            </div>
          </div>
        </div>

        <!-- Dishes Section -->
        <div class="col-12">
          <h3 class="dishes-title">Order Items</h3>

          <div v-for="(dish, index) in form.dishes" :key="index" class="dish-item">
            <div class="formgrid grid">
              <div class="field col-8">
                <label :for="`dish-${index}`">Dish</label>
                <pv-select
                    :id="`dish-${index}`"
                    v-model="dish.name"
                    :options="availableDishes"
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Select a dish"
                    class="w-full"
                    @change="updateDishPrice(index)"
                />
              </div>

              <div class="field col-3">
                <label :for="`quantity-${index}`">Quantity</label>
                <pv-input-number
                    :id="`quantity-${index}`"
                    v-model="dish.quantity"
                    class="w-full"
                    :min="1"
                    @input="calculateTotal"
                />
              </div>

              <div class="field col-1 flex align-items-end">
                <pv-button
                    icon="pi pi-trash"
                    severity="danger"
                    rounded
                    text
                    aria-label="Remove dish"
                    @click="removeDish(index)"
                    v-if="form.dishes.length > 1"
                />
              </div>
            </div>
          </div>

          <div class="col-12 mt-2">
            <pv-button
                label="+ Add a dish"
                severity="success"
                text
                @click="addDish"
                class="add-dish-btn"
            />
          </div>
        </div>

        <!-- Total -->
        <div class="col-12 mt-3">
          <div class="total-section">
            <h3 class="total-text">Estimated Total: S/ {{ totalAmount.toFixed(2) }}</h3>
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
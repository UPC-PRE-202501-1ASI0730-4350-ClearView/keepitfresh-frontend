<script setup>
import { ref, computed, onMounted } from 'vue'
import { createOrder, getDishes } from '/src/shared/services/orders.service.js'

const form = ref({
  tableNumber: null,
  dishes: [
    {
      name: '',
      quantity: 1,
      price: 0
    }
  ]
})

const availableDishes = ref([])

async function loadDishes() {
  try {
    const res = await getDishes()
    availableDishes.value = res.data
  } catch (error) {
    console.error('Error loading dishes:', error)
    // Example data, I will delete it later
    availableDishes.value = [
      { name: 'Grilled Chicken', price: 25.50 },
      { name: 'Caesar Salad', price: 18.00 },
      { name: 'Pasta Carbonara', price: 22.00 },
      { name: 'Fish & Chips', price: 28.00 },
      { name: 'Vegetable Curry', price: 20.00 },
      { name: 'Beef Steak', price: 35.00 },
      { name: 'Mushroom Risotto', price: 24.00 }
    ]
  }
}

const totalAmount = computed(() => {
  return form.value.dishes.reduce((total, dish) => {
    return total + (dish.price * dish.quantity)
  }, 0)
})

function addDish() {
  form.value.dishes.push({
    name: '',
    quantity: 1,
    price: 0
  })
}

function removeDish(index) {
  if (form.value.dishes.length > 1) {
    form.value.dishes.splice(index, 1)
    calculateTotal()
  }
}

function updateDishPrice(index) {
  const selectedDish = availableDishes.value.find(
      dish => dish.name === form.value.dishes[index].name
  )
  if (selectedDish) {
    form.value.dishes[index].price = selectedDish.price
  }
  calculateTotal()
}

function calculateTotal() {
}

function resetForm() {
  form.value = {
    tableNumber: null,
    dishes: [
      {
        name: '',
        quantity: 1,
        price: 0
      }
    ]
  }
}

async function submitOrder() {
  try {
    console.log('Submit order:', form.value)

    if (!form.value.tableNumber) {
      alert('Please enter a table number')
      return
    }

    if (form.value.dishes.some(dish => !dish.name)) {
      alert('Please select all dishes')
      return
    }

    const orderData = {
      tableNumber: form.value.tableNumber,
      dishes: form.value.dishes,
      total: totalAmount.value,
      status: 'Pending',
      createdAt: new Date().toISOString()
    }

    await createOrder(orderData)

    alert('Order created successfully!')
    resetForm()
  } catch (error) {
    console.error('Error creating order:', error)
    alert('Error creating order. Please try again.')
  }
}

onMounted(loadDishes)
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
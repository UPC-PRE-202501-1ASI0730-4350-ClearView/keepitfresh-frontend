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

</template>

<style scoped>

</style>
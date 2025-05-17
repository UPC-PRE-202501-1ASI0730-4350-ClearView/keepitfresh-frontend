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
      <h2 class="form-title">Register Product</h2>

      <div class="grid formgrid p-fluid">
        <!-- Form Fields -->
        <div class="col-12">
          <div class="formgrid grid">
            <div class="field col-12">
              <label for="name">Product Name</label>
              <pv-input-text id="name" v-model="form.name" placeholder="Enter a name" class="w-full" />
            </div>

            <div class="field col-12">
              <label for="category">Category</label>
              <pv-select
                  id="category"
                  v-model="form.category"
                  :options="categories"
                  optionLabel="label"
                  placeholder="Select"
                  class="w-full"
              />
            </div>

            <div class="field col-6">
              <label for="quantity">Quantity</label>
              <pv-input-number id="quantity" v-model="form.quantity" class="w-full" />
            </div>

            <div class="field col-6">
              <label for="price">Price</label>
              <pv-input-number
                  id="price"
                  v-model="form.price"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  class="w-full"
              />
            </div>

            <div class="field col-12">
              <label for="expiration">Expiration Date</label>
              <pv-datepicker v-model="form.expirationDate" dateFormat="mm/dd/yy" showIcon class="w-full" />
            </div>
          </div>
        </div>

        <!-- Image Upload -->
        <div class="col-12 flex flex-column align-items-center gap-3">
          <div class="image-preview">
            <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="preview-img" />
            <div v-else class="preview-placeholder">No image uploaded</div>
          </div>

          <pv-file-upload
              mode="basic"
              chooseLabel="Upload Image"
              auto
              accept="image/*"
              customUpload
              class="w-full"
              style="background-color: #AFD6FF; border-color: #AFD6FF"
              @uploader="onImageUpload"
          />
        </div>

        <!-- Buttons -->
        <div class="col-12 mt-4 flex justify-content-center gap-3">
          <pv-button label="Cancel" severity="secondary" class="px-5" @click="resetForm"/>
          <pv-button label="Register" icon="pi pi-check" class="px-5" @click="submitForm" style="background-color: #AFD6FF; border-color: #AFD6FF"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createProduct, getProducts} from '/src/shared/services/inventory.service.js'

const form = ref({
  name: '',
  category: null,
  quantity: 1,
  price: null,
  expirationDate: null,
  image: null
})

const previewUrl = ref(null)
const products = ref([])

function onImageUpload(event) {
  const file = event.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      form.value.image = reader.result
      previewUrl.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

function resetForm() {
  form.value = {
    name: '',
    category: null,
    quantity: 1,
    price: null,
    expirationDate: null,
    image: null
  }
  previewUrl.value = null
}

async function submitForm() {
  try {
    console.log('Submit function triggered')
    await createProduct({
      ...form.value,
      category: form.value.category?.label
    })
    resetForm()
    await loadProducts()
  } catch (error) {
    console.error('Error submitting product:', error)
  }
}

async function loadProducts() {
  const res = await getProducts()
  products.value = res.data
}

const categories = [
  { label: 'Fruits', value: 'fruits' },
  { label: 'Meats', value: 'meats' },
  { label: 'Drinks', value: 'drinks' },
  { label: 'Dairy', value: 'dairy' },
  { label: 'Frozen', value: 'frozen' }
]

onMounted(loadProducts)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
/* Posicionamiento general */
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
}

h2 {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 35px;
  font-weight: 700;
  margin: 0;
}

label{
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-weight: 700;
}

.preview-placeholder{
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #999;
}

.form-wrapper {
  position: relative;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 540px;
}

.form-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

/* Imagen */
.image-preview {
  width: 100%;
  text-align: center;
}

.preview-img {
  max-height: 180px;
  object-fit: contain;
  width: 100%;
  border: 2px dashed #cce4ff;
  border-radius: 0.5rem;
}

.preview-placeholder {
  padding: 1rem;
  font-size: 0.875rem;
  color: #999;
  border: 2px dashed #ccc;
  border-radius: 0.5rem;
}
:deep(.p-button) {
  border-radius: 18px !important;
  font-family: 'Arial', sans-serif !important;
  font-size: 14px !important;
}
input::placeholder {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  color: #999;
}
.form-wrapper{
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 18px;
}
:deep(.p-button:hover){
  opacity: 1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
:deep(.p-button){
  border-radius: 18px !important;
  font-family: Arial, sans-serif !important;
  font-size: 14px !important;
}
</style>

<template>
  <div class="page-container">
    <router-link to="/profile-details">
      <pv-button
          icon="pi pi-user"
          rounded
          text
          class="absolute top-0 right-0 m-3"
          aria-label="Profile"
          style="color: #AFD6FF"
      />
    </router-link>
    <div class="form-wrapper">
      <h2 class="form-title">{{ $t('inventory.title') }}</h2>

      <div class="grid formgrid p-fluid">
        <div class="col-12">
          <div class="formgrid grid">
            <div class="field col-12">
              <label for="name">{{ $t('inventory.name') }}</label>
              <pv-input-text
                  id="name"
                  v-model="form.name"
                  :placeholder="$t('inventory.placeholderName')"
                  class="w-full"
              />
            </div>

            <div class="field col-12">
              <label for="category">{{ $t('inventory.category') }}</label>
              <pv-select
                  id="category"
                  v-model="form.category"
                  :options="categories"
                  optionLabel="label"
                  :placeholder="$t('inventory.select')"
                  class="w-full"
              />
            </div>

            <div class="field col-6">
              <label for="quantity">{{ $t('inventory.quantity') }}</label>
              <pv-input-number id="quantity" v-model="form.quantity" class="w-full" />
            </div>

            <div class="field col-6">
              <label for="price">{{ $t('inventory.price') }}</label>
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
              <label for="expiration">{{ $t('inventory.expirationDate') }}</label>
              <pv-datepicker
                  v-model="form.expirationDate"
                  dateFormat="mm/dd/yy"
                  showIcon
                  class="w-full"
              />
            </div>
          </div>
        </div>

        <!-- Image Upload -->
        <div class="col-12 flex flex-column align-items-center gap-3">
          <div class="image-preview">
            <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="preview-img" />
            <div v-else class="preview-placeholder">{{ $t('inventory.imagePlaceholder') }}</div>
          </div>

          <pv-file-upload
              mode="basic"
              :chooseLabel="$t('inventory.upload')"
              auto
              accept="image/*"
              customUpload
              class="w-full"
              style="background-color: #AFD6FF; border-color: white; border-bottom-color: #AFD6FF"
              @uploader="onImageUpload"
          />
        </div>

        <!-- Buttons -->
        <div class="col-12 mt-4 flex justify-content-center gap-3">
          <pv-button :label="$t('inventory.cancel')" severity="secondary" class="px-5" @click="resetForm" />
          <pv-button
              :label="$t('inventory.register')"
              icon="pi pi-check"
              class="px-5"
              @click="submitForm"
              style="background-color: #AFD6FF; border-color: #AFD6FF"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { createProduct, getProducts } from '/src/shared/services/inventory.service.js'

const { t } = useI18n()

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
    const product = {
      ...form.value,
      category: form.value.category?.label,
      createdAt: new Date().toISOString()
    }

    await createProduct(product)
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

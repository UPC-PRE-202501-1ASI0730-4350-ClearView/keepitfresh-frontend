<template>
  <div class="page-container">
    <div class="profile-wrapper">
      <h1 class="form-title">{{ $t('profile.title') }}</h1>

      <!-- Imagen de perfil -->
      <div class="image-wrapper">
        <img :src="user.profilePicture" class="profile-img" />
      </div>

      <!-- Formulario -->
      <div class="form-content">
        <div class="text-left">
          <label for="full-name">{{ $t('profile.fullName') }}</label>
          <pv-input-text id="full-name" v-model="user.fullName" :placeholder="$t('profile.fullNamePlaceholder')" class="w-full" />
        </div>
        <div class="text-left">
          <label for="email">{{ $t('profile.email') }}</label>
          <pv-input-text id="email" v-model="user.email" :placeholder="$t('profile.emailPlaceholder')" class="w-full" />
        </div>
        <div class="text-left">
          <label for="restaurant">{{ $t('profile.restaurant') }}</label>
          <pv-input-text id="restaurant" v-model="user.restaurant" :placeholder="$t('profile.restaurantPlaceholder')" class="w-full" />
        </div>

        <pv-file-upload
            mode="basic"
            name="file"
            :choose-label="$t('profile.uploadLabel')"
            @select="handleImageUpload"
            accept="image/*"
            :auto="true"
            class="w-full"
        />

        <pv-button :label="$t('profile.save')" icon="pi pi-save" class="w-full" @click="saveChanges" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()

const user = ref({
  id: 1,
  fullName: '',
  email: '',
  restaurant: '',
  profilePicture: ''
})

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/users/1')
  user.value = res.data
})

const handleImageUpload = (event) => {
  const file = event.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      user.value.profilePicture = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const saveChanges = async () => {
  await axios.put(`http://localhost:3000/users/${user.value.id}`, user.value)
  alert(t('profile.updated'))
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.profile-wrapper {
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  width: 100%;
  max-width: 540px;
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.profile-img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:deep(.p-button) {
  background-color: #AFD6FF !important;
  border-color:  #AFD6FF !important;
  border-radius: 18px !important;
  font-family: 'Arial', sans-serif !important;
  font-size: 14px !important;
  transition: all 0.2s ease-in-out;
}

:deep(.p-button:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.05);
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import SignUp from '/src/public/components/sign-up.component.vue'
import LanguageSwitcher from '/src/public/components/languageSwitcher.vue'

const router = useRouter()

const handleSubmit = (formData) => {
  // Aquí llamas a la API para registrar usuario
  console.log('Registrando usuario:', formData)
  router.push('/login')
}
</script>

<template>
  <div class="register-wrapper">
    <!-- Selector de idioma en parte superior derecha -->
    <div class="lang-switch-container">
      <LanguageSwitcher />
    </div>

    <!-- Formulario de registro -->
    <SignUp @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.register-wrapper {
  height: 100vh;
  background: url('/src/assets/almacen.png') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.lang-switch-container {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
}
</style>

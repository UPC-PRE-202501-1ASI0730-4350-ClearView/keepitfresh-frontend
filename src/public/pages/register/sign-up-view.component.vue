<script setup>
import { useRouter } from 'vue-router'
import SignUp from '/src/public/components/sign-up.component.vue'

const router = useRouter()

const handleSubmit = (formData) => {
  // Aquí llamas a la API para registrar usuario
  console.log('Registrando usuario:', formData)
  // Luego navegas a login
  router.push('/login')
}
</script>

<template>
  <div class="register-wrapper">
    <SignUp @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.register-wrapper {
  height: 100%;
  background: url('/src/assets/almacen.png') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

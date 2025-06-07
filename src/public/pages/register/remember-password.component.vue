<script setup>
import { defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
import {Form as PvForm} from "@primevue/forms";
import {InputText as PvInputText, Password as PvPassword} from "primevue";

const emit = defineEmits(['submit'])
const password = ref('')
const error = ref('')

const router = useRouter()

const handleSubmit = () => {
  // Aquí llamas a la API para recordar contraseña
  console.log('Recuperar contraseña')
  // Luego navegas a login
  router.push('/login')
}

const goToLogin = () => {
  router.push('/login')
}

</script>

<template>
  <div class="remember-wrapper">
    <div class="remember-form">
      <div class="title">
        <h1>Reset Password </h1>
      </div>
      <pv-form @submit.prevent="handleSubmit">
        <div class="p-input-group mb-3">
          <pv-password
            v-model="password"
            placeholder="Password"
            toggleMask
            :feedback="false"
            required
          />
        </div>
        <div class="p-input-group mb-3">
          <pv-password
            v-model="password"
            placeholder="Confirm Password"
            toggleMask
            :feedback="false"
            required
          />
        </div>
        <pv-button
          label="Reset Password"
          class="w-full"
          style="
            border-radius: 18px;
            border-color: #afd6ff;
            background-color: #afd6ff;
          "
          type="submit"
        />
        <p class="mt-4 text-center">
          Go back to
          <a @click.prevent="goToLogin"
             class="text-white font-semibold hover:underline cursor-pointer">
             login
          </a>
        </p>
      </pv-form>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.remember-wrapper {
  height: 100vh;
  background-image: url("/src/assets/almacen.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.remember-form {
  width: 350px;
  padding: 40px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  color: #fff;
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
}

.remember-form h1 {
  text-align: center;
  margin-bottom: 24px;
}

:deep(.p-password input) {
  border-radius: 18px !important;
  width: 265px !important;
}

.role-btn {
  border-radius: 18px;
  background-color: #09090b;
  color: #fff;
  border: 1px solid #09090b;
  transition: background-color 0.3s ease, color 0.3s ease;
}

:deep(.p-button:hover) {
  background-color: #afd6ff !important;
  border-color: #afd6ff !important;
}

/* Para el input dentro de pv-password */
:deep(.p-password.p-focus input),
:deep(.p-inputtext.p-focus) {
  outline: none !important;
  box-shadow: none !important;
  border-color: #afd6ff !important;
}

/* Si quieres quitar el borde verde también al icono toggle */
:deep(.p-password.p-focus .p-password-input-icon) {
  color: inherit !important;
}

</style>
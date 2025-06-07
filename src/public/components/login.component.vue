<script setup>
import { defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '/src/shared/services/user.service.js'

const emit = defineEmits(['submit'])

const email = ref('')
const password = ref('')
const error = ref('')
const remember = ref(false)
const role = ref('waiter')

const selectRole = (value) => {
  role.value = value
}

const router = useRouter()

const handleLogin = async () => {
  error.value = null
  try {
    const user = await login(email.value, password.value)
    console.log('User logged in:', user)
    // Guarda el usuario en localStorage o Pinia/Vuex
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/') // redirige a home o dashboard
  } catch (e) {
    error.value = e.message
  }
}

const goToRegister = () => {
  router.push('/register')
}

const goToRemember = () => {
  router.push('/remember')
}

</script>

<template>
  <div class="login-wrapper">
    <div class="login-form">
      <div class="title">
        <h1>Login</h1>
      </div>
      <div class="role-select mb-3 mt-3">
        <pv-button
            label="Waiter"
            :class="{ 'active-role': role === 'waiter' }"
            @click="selectRole('waiter')"
            class="mr-2 role-btn"
        />
        <pv-button
            label="Manager"
            :class="{ 'active-role': role === 'manager' }"
            @click="selectRole('manager')"
            class="role-btn"
        />
      </div>
      <pv-form @submit.prevent="handleLogin">
        <div class="p-input-group mb-3">
          <pv-input-text
              v-model="email"
              placeholder="Email"
              style="border-radius: 18px; width: 265px"
              required
          />
          <span class="p-input-group-addon"></span>
        </div>

        <div class="p-input-group mb-3">
          <pv-password
              v-model="password"
              placeholder="Password"
              toggleMask
              :feedback="false"
              required
          />
        </div>

        <div
            style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            height: 40px;
          "
        >
          <div style="display: flex; align-items: center">
            <pv-checkbox v-model="remember" inputId="remember" />
            <label for="remember" style="margin-left: 8px; color: white">
              Remember me
            </label>
          </div>
          <a
              href="#"
              style="
              color: white;
              font-size: 0.875rem;
              text-decoration: underline;
              white-space: nowrap;
            "
              @click.prevent="goToRemember"
              class="text-white font-semibold hover:underline cursor-pointer"
          >
            Forgot?
          </a>
        </div>

        <pv-button
            label="Login"
            class="w-full"
            style="
            border-radius: 18px;
            border-color: #afd6ff;
            background-color: #afd6ff;
          "
            type="submit"
        />
        <p class="mt-4 text-center">
          Don't have an account?
          <a
              @click.prevent="goToRegister"
              class="text-white font-semibold hover:underline cursor-pointer"
          >
            Register
          </a>
        </p>
      </pv-form>
      <p v-if="error" style="color: #ff6b6b; margin-top: 1rem">{{ error }}</p>
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

.login-wrapper {
  height: 100vh;
  background-image: url("/src/assets/almacen.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
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

.role-select {
  display: flex;
  justify-content: center;
}

.title {
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
}

.login-form h1 {
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

.role-btn:hover {
  background-color: #fff;
  color: #afd6ff;
  border-color: #afd6ff;
}

.active-role {
  background-color: #afd6ff !important;
  border-color: #afd6ff !important;
  color: #fff !important;
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

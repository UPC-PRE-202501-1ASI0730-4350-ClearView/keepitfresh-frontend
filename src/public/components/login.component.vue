<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import {Button as PvButton, Checkbox as PvCheckbox, Password as PvPassword} from "primevue";

const username = ref('')
const password = ref('')
const remember = ref(false)

const router = useRouter()

const handleLogin = () => {
  console.log({ username: username.value, password: password.value, remember: remember.value })
  // Aquí puedes hacer la llamada con axios
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
    <div class="login-wrapper">
      <div class="login-form">
        <h2>Login</h2>
        <pv-form @submit.prevent="handleLogin">
          <div class="p-inputgroup mb-3">
            <InputText v-model="username" placeholder="Username" />
            <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          </div>

          <div class="p-inputgroup mb-3">
            <pv-password
                v-model="password"
                placeholder="Password"
                toggleMask
                :feedback="false"
            />
          </div>

          <div class="flex justify-between align-items-center mb-3">
            <div>
              <pv-checkbox v-model="remember" inputId="remember" />
              <label for="remember" class="ml-2 text-white">Remember me</label>
            </div>
            <a href="#" class="text-white text-sm hover:underline">Forgot?</a>
          </div>

          <pv-button label="Login" class="w-full" />
          <p class="mt-4 text-center">
            Don't have an account?
            <a @click.prevent="goToRegister" class="text-white font-semibold hover:underline cursor-pointer">
              Register
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

.login-wrapper {
  width: 100vw;
  height: 100vh;
  background-image: url('/src/assets/almacen.png');
  background-repeat: no-repeat;
  background-position: center center ;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 400px;
  padding: 40px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  color: #fff;
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.login-form h2 {
  text-align: center;
  margin-bottom: 24px;
}

.input-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #fff;
}
</style>
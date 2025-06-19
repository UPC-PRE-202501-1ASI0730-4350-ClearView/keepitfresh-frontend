<script setup>
import { defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '/src/shared/services/user.service.js'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './languageSwitcher.vue'

const { t } = useI18n()
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
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/')
  } catch (e) {
    error.value = t('auth.login.error')
  }
}

const goToRegister = () => router.push('/register')
const goToRemember = () => router.push('/remember')
</script>

<template>
  <div class="login-wrapper">
    <!-- Botón de cambio de idioma en la esquina superior derecha de la página -->
    <div class="lang-switch-page">
      <LanguageSwitcher />
    </div>

    <div class="login-form">
      <!-- Título -->
      <div class="title">
        <h1>{{ $t('auth.login.title') }}</h1>
      </div>

      <!-- Selección de rol -->
      <div class="role-select mb-3 mt-3">
        <pv-button
            :label="$t('auth.login.waiter')"
            :class="{ 'active-role': role === 'waiter' }"
            @click="selectRole('waiter')"
            class="mr-2 role-btn"
        />
        <pv-button
            :label="$t('auth.login.manager')"
            :class="{ 'active-role': role === 'manager' }"
            @click="selectRole('manager')"
            class="role-btn"
        />
      </div>

      <!-- Formulario -->
      <pv-form @submit.prevent="handleLogin">
        <div class="p-input-group mb-3">
          <pv-input-text
              v-model="email"
              :placeholder="$t('auth.login.email')"
              style="border-radius: 18px; width: 265px"
              required
          />
        </div>

        <div class="p-input-group mb-3">
          <pv-password
              v-model="password"
              :placeholder="$t('auth.login.password')"
              toggleMask
              :feedback="false"
              required
          />
        </div>

        <div class="remember-container">
          <div class="remember-left">
            <pv-checkbox v-model="remember" inputId="remember" />
            <label for="remember" class="ml-2 text-white">
              {{ $t('auth.login.remember') }}
            </label>
          </div>
          <a
              href="#"
              class="text-white font-semibold hover:underline cursor-pointer"
              @click.prevent="goToRemember"
          >
            {{ $t('auth.login.forgot') }}
          </a>
        </div>

        <pv-button
            :label="$t('auth.login.submit')"
            class="w-full"
            style="border-radius: 18px; border-color: #afd6ff; background-color: #afd6ff"
            type="submit"
        />

        <p class="mt-4 text-center">
          {{ $t('auth.login.noAccount') }}
          <a
              @click.prevent="goToRegister"
              class="text-white font-semibold hover:underline cursor-pointer"
          >
            {{ $t('auth.login.register') }}
          </a>
        </p>
      </pv-form>

      <p v-if="error" style="color: #ff6b6b; margin-top: 1rem">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  height: 100vh;
  background-image: url("/src/assets/almacen.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.lang-switch-page {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
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

.title {
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
}

.role-select {
  display: flex;
  justify-content: center;
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

:deep(.p-password.p-focus input),
:deep(.p-inputtext.p-focus) {
  outline: none !important;
  box-shadow: none !important;
  border-color: #afd6ff !important;
}

:deep(.p-password.p-focus .p-password-input-icon) {
  color: inherit !important;
}

.remember-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  height: 40px;
}

.remember-left {
  display: flex;
  align-items: center;
}
</style>

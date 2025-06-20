<template>
  <div class="signup-form">
    <!-- Language Switcher -->

    <!-- Title -->
    <div class="title">
      <h1>{{ $t('auth.signup.title') }}</h1>
    </div>

    <!-- Role selection -->
    <div class="role-select">
      <pv-button
          :label="$t('auth.signup.waiter')"
          :class="{ 'active-role': role === 'waiter' }"
          @click="selectRole('waiter')"
          class="mr-2 role-btn"
      />
      <pv-button
          :label="$t('auth.signup.manager')"
          :class="{ 'active-role': role === 'manager' }"
          @click="selectRole('manager')"
          class="role-btn"
      />
    </div>

    <!-- Form -->
    <pv-form @submit.prevent="onSubmit" class="mt-4">
      <pv-input-text
          v-model="email"
          type="email"
          :placeholder="$t('auth.signup.email')"
          required
          class="mb-3"
          style="width: 100%; border-radius: 18px"
      />

      <!-- Nombre y Apellido en una sola fila sin desborde -->
      <div class="name-fields mb-3">
        <div class="name-input">
          <pv-input-text
              v-model="firstName"
              :placeholder="$t('auth.signup.firstName')"
              required
          />
        </div>
        <div class="name-input">
          <pv-input-text
              v-model="lastName"
              :placeholder="$t('auth.signup.lastName')"
              required
          />
        </div>
      </div>

      <pv-password
          v-model="password"
          :placeholder="$t('auth.signup.password')"
          toggleMask
          feedback="false"
          required
          class="mb-3"
      />
      <pv-password
          v-model="confirmPassword"
          :placeholder="$t('auth.signup.confirmPassword')"
          toggleMask
          feedback="false"
          required
          class="mb-3"
      />

      <div class="flex align-items-center mb-4">
        <pv-checkbox v-model="remember" inputId="remember" />
        <label for="remember" class="ml-2">{{ $t('auth.signup.remember') }}</label>
      </div>

      <pv-button
          :label="$t('auth.signup.submit')"
          type="submit"
          class="w-full"
          style="border-radius: 18px; border-color: #AFD6FF; background-color: #AFD6FF"
      />

      <p class="mt-4 text-center">
        {{ $t('auth.signup.alreadyAccount') }}
        <a @click.prevent="goToLogin" class="text-white font-semibold hover:underline cursor-pointer">
          {{ $t('auth.signup.login') }}
        </a>
      </p>
    </pv-form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './languageSwitcher.vue'

const { t } = useI18n()
const emit = defineEmits(['submit'])

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const password = ref('')
const confirmPassword = ref('')
const remember = ref(false)
const role = ref('waiter')

const selectRole = (value) => {
  role.value = value
}

const onSubmit = () => {
  if (password.value !== confirmPassword.value) {
    alert(t('auth.signup.passwordMismatch'))
    return
  }
  emit('submit', {
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    password: password.value,
    remember: remember.value,
    role: role.value,
  })
}

const router = useRouter()
const goToLogin = () => router.push('/login')
</script>

<style scoped>
.signup-form {
  width: 350px;
  padding: 2rem;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  color: #fff;
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: Arial, sans-serif;
  position: relative;
}

.lang-switch-container {
  position: absolute;
  top: 16px;
  right: 16px;
}

.title {
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
}

.role-select {
  display: flex;
  justify-content: center;
}

/* Name/LastName correction */
.name-fields {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.name-input {
  flex: 1;
}

.name-input :deep(input) {
  width: 100%;
  border-radius: 18px !important;
}

.flex {
  display: flex;
}
.gap-2 {
  gap: 0.5rem;
}
.mr-2 {
  margin-right: 0.5rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.mb-3 {
  margin-bottom: 1rem;
}
.mb-4 {
  margin-bottom: 1.5rem;
}
.mt-4 {
  margin-top: 1rem;
}
.flex-1 {
  flex: 1;
}
.align-items-center {
  align-items: center;
}

:deep(.p-password input) {
  border-radius: 18px !important;
  width: 100% !important;
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
  color: #AFD6FF;
  border-color: #AFD6FF;
}

.active-role {
  background-color: #AFD6FF !important;
  border-color: #AFD6FF;
}

:deep(.p-button:hover) {
  background-color: #AFD6FF !important;
  border-color: #AFD6FF !important;
}

:deep(.p-password.p-focus input),
:deep(.p-inputtext.p-focus) {
  outline: none !important;
  box-shadow: none !important;
  border-color: #AFD6FF !important;
}

:deep(.p-password.p-focus .p-password-input-icon) {
  color: inherit !important;
}
</style>

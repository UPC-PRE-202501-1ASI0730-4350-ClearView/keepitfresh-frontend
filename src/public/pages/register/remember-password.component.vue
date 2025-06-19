<script setup>
import { defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Form as PvForm } from "@primevue/forms"
import { Password as PvPassword } from "primevue"
import LanguageSwitcher from '/src/public/components/languageSwitcher.vue'

const emit = defineEmits(['submit'])
const { t } = useI18n()
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const router = useRouter()

const handleSubmit = () => {
  if (password.value !== confirmPassword.value) {
    error.value = t('auth.remember.mismatch')
    return
  }

  console.log('Recuperar contraseña')
  router.push('/login')
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="remember-wrapper">
    <div class="lang-switch-container">
      <LanguageSwitcher />
    </div>

    <div class="remember-form">
      <div class="title">
        <h1>{{ t('auth.remember.title') }}</h1>
      </div>

      <pv-form @submit.prevent="handleSubmit">
        <div class="p-input-group mb-3">
          <pv-password
              v-model="password"
              :placeholder="t('auth.remember.new')"
              toggleMask
              :feedback="false"
              required
          />
        </div>

        <div class="p-input-group mb-3">
          <pv-password
              v-model="confirmPassword"
              :placeholder="t('auth.remember.confirm')"
              toggleMask
              :feedback="false"
              required
          />
        </div>

        <pv-button
            :label="t('auth.remember.submit')"
            class="w-full"
            style="border-radius: 18px; border-color: #afd6ff; background-color: #afd6ff"
            type="submit"
        />

        <p class="mt-4 text-center">
          {{ t('auth.remember.return') }}
          <a @click.prevent="goToLogin"
             class="text-white font-semibold hover:underline cursor-pointer">
            {{ t('auth.remember.login') }}
          </a>
        </p>

        <p v-if="error" style="color: #ff6b6b; margin-top: 1rem">{{ error }}</p>
      </pv-form>
    </div>
  </div>
</template>

<style scoped>
.remember-wrapper {
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

.lang-switch-container {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
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
  margin-bottom: 24px;
}

:deep(.p-password input) {
  border-radius: 18px !important;
  width: 265px !important;
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
</style>

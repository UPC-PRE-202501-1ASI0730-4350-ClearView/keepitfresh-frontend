<template>
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

  <section class="cards-container">
    <div class="min-h-screen px-4 py-8 bg-black">
      <h2
          class="text-3xl md:text-4xl font-bold text-center mb-10 text-white"
          style="font-family: 'Roboto Condensed', sans-serif;"
      >
        {{ $t('subscriptions.title') }}
      </h2>

      <div class="grid">
        <!-- Plan Básico -->
        <pv-card class="shadow-lg border border-gray-700 rounded-xl p-4 bg-[#111] text-white" style="border-radius: 18px;">
          <template #title>
            <h3 class="text-xl font-semibold text-center" style="font-family: 'Arial', sans-serif;">
              {{ $t('subscriptions.basic.title') }}
            </h3>
          </template>
          <template #content>
            <div class="text-center text-2xl font-bold mb-3" style="font-family: 'Arial', sans-serif;">
              {{ $t('subscriptions.basic.price') }}
            </div>
            <ul class="text-sm text-gray-400 mb-5 space-y-1 px-4" style="font-family: 'Arial', sans-serif;">
              <li>{{ $t('subscriptions.basic.p1') }}</li>
              <li>{{ $t('subscriptions.basic.p2') }}</li>
              <li>{{ $t('subscriptions.basic.p3') }}</li>
              <li>{{ $t('subscriptions.basic.p4') }}</li>
            </ul>
            <pv-button
                :label="$t('subscriptions.pay')"
                class="w-full p-button-sm p-button-secondary"
                style="font-family: 'Arial', sans-serif; border-radius: 10px"
            />
          </template>
        </pv-card>

        <!-- Premium Mensual -->
        <pv-card class="shadow-lg border border-gray-700 rounded-xl p-4 bg-[#111] text-white" style="border-radius: 18px;">
          <template #title>
            <h3 class="text-xl font-semibold text-center" style="font-family: 'Arial', sans-serif;">
              {{ $t('subscriptions.premium.title') }}
            </h3>
          </template>
          <template #content>
            <div class="text-center text-2xl font-bold mb-3" style="font-family: 'Arial', sans-serif;">
              {{ $t('subscriptions.premium.monthlyPrice') }}
            </div>
            <ul class="text-sm text-gray-400 mb-5 space-y-1 px-4" style="font-family: 'Arial', sans-serif;">
              <li>{{ $t('subscriptions.premium.p1') }}</li>
              <li>{{ $t('subscriptions.premium.p2') }}</li>
              <li>{{ $t('subscriptions.premium.p3') }}</li>
              <li>{{ $t('subscriptions.premium.p4') }}</li>
              <li>{{ $t('subscriptions.premium.p5') }}</li>
            </ul>
            <pv-button
                :label="$t('subscriptions.pay')"
                class="w-full p-button-sm p-button-secondary"
                style="font-family: 'Arial', sans-serif; border-radius: 10px"
            />
          </template>
        </pv-card>

        <!-- Premium Anual -->
        <pv-card class="shadow-lg border border-gray-700 rounded-xl p-4 bg-[#111] text-white" style="border-radius: 18px;">
          <template #title>
            <h3 class="text-xl font-semibold text-center" style="font-family: 'Arial', sans-serif;">
              {{ $t('subscriptions.premium.title') }}
            </h3>
          </template>
          <template #content>
            <div class="text-center text-2xl font-bold mb-3" style="font-family: 'Arial', sans-serif;">
              {{ $t('subscriptions.premium.yearlyPrice') }}
            </div>
            <ul class="text-sm text-gray-400 mb-5 space-y-1 px-4" style="font-family: 'Arial', sans-serif;">
              <li>{{ $t('subscriptions.premium.p1') }}</li>
              <li>{{ $t('subscriptions.premium.p2') }}</li>
              <li>{{ $t('subscriptions.premium.p3') }}</li>
              <li>{{ $t('subscriptions.premium.p4') }}</li>
              <li>{{ $t('subscriptions.premium.p5') }}</li>
            </ul>
            <pv-button
                :label="$t('subscriptions.pay')"
                class="w-full p-button-sm p-button-secondary"
                style="font-family: 'Arial', sans-serif; border-radius: 10px"
            />
          </template>
        </pv-card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.cards-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.grid {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

:deep(.p-button:hover) {
  opacity: 1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

:deep(.p-button) {
  border-radius: 18px !important;
  font-family: Arial, sans-serif !important;
  font-size: 14px !important;
}
</style>

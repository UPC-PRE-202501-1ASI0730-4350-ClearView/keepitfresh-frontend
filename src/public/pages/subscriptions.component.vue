<template>
  <router-link to="/profile-details">
    <pv-button
        icon="pi pi-user"
        rounded
        text
        class="absolute top-0 right-0 m-3"
        aria-label="Profile"
    />
  </router-link>
  <section class="cards-container">


    <div class="min-h-screen px-4 py-8 bg-black">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-10 text-white" style="font-family: 'Roboto Condensed', sans-serif;">
        Subscription Plans
      </h2>

      <div class="flex justify-center">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">

          <!-- Basic Plan -->
          <pv-card class="shadow-lg border border-gray-700 rounded-xl p-4 bg-[#111] text-white" style="border-radius: 18px;">
            <template #title>
              <h3 class="text-xl font-semibold text-center" style="font-family: 'Arial', sans-serif;">Basic</h3>
            </template>
            <template #content>
              <div class="text-center text-2xl font-bold mb-3" style="font-family: 'Arial', sans-serif;">
                S/. 40<span class="text-sm font-normal"> /month</span>
              </div>
              <ul class="text-sm text-gray-400 mb-5 space-y-1 px-4" style="font-family: 'Arial', sans-serif;">
                <li>Up to 100 products in inventory.</li>
                <li>Basic expiration alerts.</li>
                <li>Search by name and category.</li>
                <li>Report export in PDF format.</li>
              </ul>
              <pv-button label="Pay" class="w-full p-button-sm p-button-secondary" style="font-family: 'Arial', sans-serif; border-radius: 10px" />
            </template>
          </pv-card>

          <!-- Premium Plan -->
          <pv-card class="shadow-lg border border-gray-700 rounded-xl p-4 bg-[#111] text-white" style="border-radius: 18px;">
            <template #title>
              <h3 class="text-xl font-semibold text-center" style="font-family: 'Arial', sans-serif;">Premium</h3>
            </template>
            <template #content>
              <div class="text-center text-2xl font-bold mb-3" style="font-family: 'Arial', sans-serif;">
                S/. 60<span class="text-sm font-normal"> /month</span>
              </div>
              <ul class="text-sm text-gray-400 mb-5 space-y-1 px-4" style="font-family: 'Arial', sans-serif;">
                <li>Unlimited products.</li>
                <li>Unlimited users with custom roles.</li>
                <li>Automatic reports via email.</li>
                <li>Personalized training.</li>
                <li>Dedicated technical support.</li>
              </ul>
              <pv-button label="Pay" class="w-full p-button-sm p-button-secondary" style="font-family: 'Arial', sans-serif; border-radius: 10px" />
            </template>
          </pv-card>

          <!-- Premium Plan -->
          <pv-card class="shadow-lg border border-gray-700 rounded-xl p-4 bg-[#111] text-white" style="border-radius: 18px;">
            <template #title>
              <h3 class="text-xl font-semibold text-center" style="font-family: 'Arial', sans-serif;">Premium</h3>
            </template>
            <template #content>
              <div class="text-center text-2xl font-bold mb-3" style="font-family: 'Arial', sans-serif;">
                S/. 600<span class="text-sm font-normal"> /year</span>
              </div>
              <ul class="text-sm text-gray-400 mb-5 space-y-1 px-4" style="font-family: 'Arial', sans-serif;">
                <li>Unlimited products.</li>
                <li>Unlimited users with custom roles.</li>
                <li>Automatic reports via email.</li>
                <li>Personalized training.</li>
                <li>Dedicated technical support.</li>
              </ul>
              <pv-button label="Pay" class="w-full p-button-sm p-button-secondary" style="font-family: 'Arial', sans-serif; border-radius: 10px" />
            </template>
          </pv-card>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
</script>

<style scoped>
section{
 align-content: center;
}
:deep(.p-button:hover){
  opacity: 1;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
:deep(.p-button){
  border-radius: 18px !important;
  font-family: Arial, sans-serif !important;
  font-size: 14px !important;
}
</style>

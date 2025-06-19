<template>
  <div class="language-switcher">
    <button
        v-for="lang in languages"
        :key="lang"
        :class="['lang-button', { active: locale === lang }]"
        @click="changeLanguage(lang)">
      {{ lang.toUpperCase() }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const languages = ['es', 'en']

function changeLanguage(lang) {
  locale.value = lang
  localStorage.setItem('language', lang)
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
  background: #f2f2f2;
  padding: 0.5rem;
  border-radius: 8px;
  justify-content: center;
}

.lang-button {
  padding: 0.5rem 1rem;
  border: none;
  background: #ccc;
  color: #000;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
}

.lang-button.active {
  background-color: #4caf50;
  color: white;
}
</style>

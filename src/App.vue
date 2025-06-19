<template>
  <div class="app-container">
    <!-- Ocultar sidebar en rutas públicas -->
    <Sidebar v-if="!hideSidebar" />

    <main :class="['main-content', { 'with-sidebar': !hideSidebar }]">
      <router-view />
    </main>

  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './public/components/sidebar-content.component.vue'
import LanguageSwitcher from './public/components/languageSwitcher.vue'

export default {
  components: { Sidebar, LanguageSwitcher },
  setup() {
    const route = useRoute()

    const hiddenRoutes = ['/login', '/register', '/remember']
    const hideSidebar = computed(() => hiddenRoutes.includes(route.path))

    return { hideSidebar }
  }
}
</script>

<style>
.app-container {
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s ease;
  padding: 1rem;
}

.with-sidebar {
  margin-left: 280px;
}

.language-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
</style>

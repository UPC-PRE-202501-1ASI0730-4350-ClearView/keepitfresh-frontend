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

export default {
  components: { Sidebar },
  setup() {
    const route = useRoute()

    // Lista de rutas donde no se debe mostrar el sidebar
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
  transition: margin-left 0.3s ease;;
}

.with-sidebar {
  margin-left: 280px;
}
</style>

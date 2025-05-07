<template>
  <div class="app-container">
    <Sidebar /> <!-- Aquí se muestra el Sidebar -->
    <div class="main-content">
      <router-view /> <!-- Contenido principal (si usas Vue Router) -->
    </div>
  </div>
</template>

<script>
import Sidebar from './public/components/sidebar-content.component.vue';

export default {
  components: {
    Sidebar
  }
}
</script>

<style>
.app-container {
  display: flex;
  height: 100vh;
}
.main-content {
  flex: 1;
  padding: 1rem;
}
</style>
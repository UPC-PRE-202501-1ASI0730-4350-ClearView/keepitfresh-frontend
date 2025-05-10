<template>
  <div class="app-container">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
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
  min-height: 100vh;
  overflow-x: hidden;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s ease;
  padding: 1rem;
}

@media (min-width: 768px) {
  .main-content {
    margin-left: 280px;
  }
}
</style>
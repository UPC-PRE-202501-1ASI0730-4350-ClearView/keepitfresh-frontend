<template>
  <div id="app">
    <Sidebar /> <!-- Aquí se muestra el Sidebar -->
    <router-view /> <!-- Contenido principal (si usas Vue Router) -->
  </div>
</template>

<script setup>
import Sidebar from './public/components/sidebar-content.component.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto Condensed', sans-serif;
}
body {
  background: var(--light);
}
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.app {
  display: flex;
}
.app main {
  flex: 1 1 0;
  padding: 2rem;
}
@media (max-width: 1024px) {
  .app main {
    padding-left: 6rem;
  }
}

</style>
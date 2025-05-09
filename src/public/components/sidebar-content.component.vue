<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo">
      <img :src="" alt="Vue" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link to="/" class="button">
        <span class="pi pi-home">home</span>
        <span class="text">Home</span>
      </router-link>
      <router-link to="/inventory" class="button">
        <span class="pi pi-box">inventory</span>
        <span class="text">Inventory</span>
      </router-link>
      <router-link to="/sensors" class="button">
        <span class="material-icons">sensors</span>
        <span class="text">Sensonrs</span>
      </router-link>
      <router-link to="/contact" class="button">
        <span class="material-icons">email</span>
        <span class="text">Contact</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link to="/settings" class="button">
        <span class="material-icons">settings</span>
        <span class="text">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script>
import { ref } from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value
  localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

<style>

</style>
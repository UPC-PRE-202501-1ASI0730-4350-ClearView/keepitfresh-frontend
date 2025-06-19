<script>
import { PanelMenu as PvPanelMenu } from "primevue";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import router from "../../router/index.js";

export default {
  name: "Sidebar",
  components: { PvPanelMenu },
  setup() {
    const isMobile = ref(false);
    const sidebarOpen = ref(false);

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth < 768;
      // En desktop, el sidebar siempre está abierto
      if (!isMobile.value) {
        sidebarOpen.value = true;
      }
    };

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };

    onMounted(() => {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkScreenSize);
    });

    return {
      isMobile,
      sidebarOpen,
      toggleSidebar,
      menuItems: [
          { label: 'Create Orders', icon: 'pi pi-file', command: () => router.push('/create-order'), style: {'font-family': 'Arial, sans-serif', 'font-size': '14px'}},
        { label: 'Order List ', icon: 'pi pi-list', command: () => router.push('/order-list'), style: {'font-family': 'Arial, sans-serif', 'font-size': '14px'}},
      ],
      signOutItem: [
        { label: 'Sign Out', icon: 'pi pi-sign-out', to: '/signout', style: {'font-family': 'Arial, sans-serif', 'font-size': '14px'} }
      ]
    };
  }
};
</script>

<template>
  <div>
    <Button
        v-if="isMobile"
        icon="pi pi-bars"
        @click="toggleSidebar"
        class="sidebar-toggle p-button-rounded p-button-text"
        style="position: fixed; top: 10px; left: 10px; z-index: 1001;"
    />

    <!-- Sidebar -->
    <div
        class="sidebar"
        :class="{ 'sidebar--active': sidebarOpen }">
      <div class="logo-container">
        <img src="/src/assets/logo.png" alt="Logo" class="logo">
        <div class="sidebar-logo">
          KeepItFresh
        </div>
      </div>

      <div class="sidebar-container">
        <PvPanelMenu
            :model="menuItems"
            :multiple="true"
            class="w-full"
        />
      </div>

      <div class="sign-out-container">
        <PvPanelMenu
            :model="signOutItem"
            class="w-full"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: #AFD6FF;
  padding: 20px;
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  transform: translateX(-100%);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.logo{
  width: 50px;
  height: auto;
}

.sidebar-logo{
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 35px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.sidebar--active {
  transform: translateX(0);
}

.sign-out-container{
  position: fixed;
  bottom: 20px;
  left: 80px;
}

/* Estilos para desktop */
@media (min-width: 768px) {
  .sidebar {
    transform: none;
    position: fixed;
  }

  body {
    margin-left: 280px;
  }
}
</style>
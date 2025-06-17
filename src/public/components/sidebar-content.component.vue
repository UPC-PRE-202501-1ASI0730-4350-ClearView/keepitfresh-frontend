<template>
  <div>
    <!-- Botón hamburguesa en vista móvil -->
    <Button
        v-if="isMobile"
        icon="pi pi-bars"
        @click="toggleSidebar"
        class="sidebar-toggle p-button-rounded p-button-text"
        style="position: fixed; top: 10px; left: 10px; z-index: 1001;"
    />

    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar--active': sidebarOpen }">
      <div class="logo-container">
        <img src="/src/assets/logo.png" alt="Logo" class="logo" />
        <div class="sidebar-logo">KeepItFresh</div>
      </div>

      <!-- Menú principal -->
      <div class="sidebar-container">
        <PvPanelMenu :model="menuItems" :multiple="true" class="w-full" />
      </div>

      <!-- Selector de idioma -->
      <div class="language-switcher-wrapper">
        <LanguageSwitcher />
      </div>

      <!-- Cerrar sesión -->
      <div class="sign-out-container">
        <PvPanelMenu :model="signOutItem" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script>
import { PanelMenu as PvPanelMenu } from "primevue";
import { ref, onMounted, onBeforeUnmount, computed, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import router from "../../router/index.js";
import LanguageSwitcher from './languageSwitcher.vue';

export default {
  name: "Sidebar",
  components: { PvPanelMenu, LanguageSwitcher },
  setup() {
    const { t } = useI18n();
    const isMobile = ref(false);
    const sidebarOpen = ref(false);

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth < 768;
      if (!isMobile.value) sidebarOpen.value = true;
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

    const baseStyle = {
      'font-family': 'Arial, sans-serif',
      'font-size': '14px'
    };

    const menuItems = ref([]);
    const signOutItem = ref([]);

    watchEffect(() => {
      menuItems.value = [
        { label: t('option.home'), icon: 'pi pi-home', command: () => router.push('/home'), style: baseStyle },
        {
          label: t('option.inventory'), icon: 'pi pi-box', style: baseStyle, items: [
            { label: t('option.addProduct'), icon: 'pi pi-plus', command: () => router.push('/add-product'), style: baseStyle },
            { label: t('option.productList'), icon: 'pi pi-list', command: () => router.push('/product-list'), style: baseStyle },
          ]
        },
        { label: t('option.sensors'), icon: 'pi pi-wifi', command: () => router.push('/sensor-view'), style: baseStyle },
        { label: t('option.statistics'), icon: 'pi pi-chart-bar', command: () => router.push('/statistics'), style: baseStyle },
        {
          label: t('option.alerts'), icon: 'pi pi-bell', style: baseStyle, items: [
            { label: t('option.sensorAlerts'), icon: 'pi pi-wifi', command: () => router.push('/alerts/sensor-alerts'), style: baseStyle },
            { label: t('option.inventoryAlerts'), icon: 'pi pi-box', command: () => router.push('/alerts/inventory-alerts'), style: baseStyle },
          ]
        },
        { label: t('option.subscription'), icon: 'pi pi-money-bill', command: () => router.push('/subscriptions'), style: baseStyle },
        { label: t('option.profile'), icon: 'pi pi-user', command: () => router.push('/profile-details'), style: baseStyle }
      ];

      signOutItem.value = [
        { label: t('option.signOut'), icon: 'pi pi-sign-out', command: () => router.push('/register'), style: baseStyle }
      ];
    });

    return {
      isMobile,
      sidebarOpen,
      toggleSidebar,
      menuItems,
      signOutItem
    };
  }
};
</script>

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
  display: flex;
  flex-direction: column;
}

.sidebar--active {
  transform: translateX(0);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.logo {
  width: 50px;
  height: auto;
}

.sidebar-logo {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 35px;
  font-weight: 700;
  color: white;
}

.sidebar-container {
  flex: 1;
  margin-bottom: 2rem;
}

.language-switcher-wrapper {
  padding: 1rem 0;
  display: flex;
  justify-content: center;
}

.sign-out-container {
  margin-top: auto;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
}

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

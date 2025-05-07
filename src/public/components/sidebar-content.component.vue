<script>
import {PanelMenu as PvPanelMenu} from "primevue";

export default {
  name: "sidebar",
  components: {PvPanelMenu},
  data() {
    return {
      menuItems: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          to: '/home'
        },
        {
          label: 'Inventory',
          icon: 'pi pi-box',
          to: '/inventory'
        },
        {
          label: 'Sensors',
          icon: 'pi pi-wifi',
          to: '/sensors'
        },
        {
          label:'Statistics',
          icon: 'pi pi-chart-bar',
          to: '/statistics'
        },
        {
          label: 'Alerts',
          icon: 'pi pi-bell',
          to: '/alerts'
        },
        {
          label: 'Reports',
          icon: 'pi pi-file',
          to: '/reports'
        },
        {
          label:'Subscriptions',
          icon: 'pi pi-money-bill',
          to: '/subscriptions'
        },
        {
          label: 'Profile',
          icon: 'pi pi-user',
          to: '/profile'
        }
      ],
      signOutItem: [
        {
          label: 'Sign Out',
          icon: 'pi pi-sign-out',
          to: '/signout'
        }
      ]
    }
  }
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-logo">
      KeepItFresh
    </div>
    <div class="sidebar-container">
      <pv-panel-menu :model="menuItems" class="w-full md:w-20rem" color="primary"/>
    </div>
    <div class="sign-out-container">
      <pv-panel-menu :model="signOutItem" class="w-full md:w-20rem" color="primary"/>
    </div>
  </div>
</template>

<style scoped>
.sidebar{
  position: fixed;
  top: 0;
  left: 0;
  width: 350px;
  height: 100%;
  background-color: #AFD6FF;
  padding: 20px;
}
.sidebar-logo {
  position: relative;
  font-size: 24px;
  top: 0;
  left: 0;
}
.sidebar-container{
  position: relative;
  top: 0;
  left: 0;
}
.sign-out-container {
  position: absolute;
  bottom: 20px;
}
</style>
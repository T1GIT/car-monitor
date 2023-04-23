<script lang="ts" setup>
import type { MenuItem } from 'primevue/menuitem'
import { PrimeIcons } from 'primevue/api'
import TabMenu from 'primevue/tabmenu'
import { RouteName } from '@/shared/constants/route-name'

const menu: MenuItem[] = [
  { label: 'Карта', icon: PrimeIcons.MAP, to: { name: RouteName.MAP } },
  { label: 'Автомобили', icon: PrimeIcons.CAR, to: { name: RouteName.CARS } },
]
</script>

<template>
  <div class="app-component">
    <TabMenu data-test="header" class="header" :model="menu" />

    <RouterView data-test="router" class="router" />
  </div>
</template>

<style lang="scss" scoped>
.app-component {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    padding-top: 10px;
    flex: none;

    ::v-deep(.p-tabmenu-nav) {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
  }

  .router {
    flex: 1;
  }
}
</style>

<style lang="scss">
@import "primevue/resources/themes/lara-dark-teal/theme.css";
@import "primevue/resources/primevue.min.css";
@import "primeicons/primeicons.css";
@import url('../node_modules/bootstrap-icons/font/bootstrap-icons.css');

body {
  margin: 0;
  font-family: var(--font-family);
}

html, body, #app {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <header>
    <div class="text-danger text-shadow d-flex justify-content-center" id="logo">
      <h3 class="mt-1">
        RPG Blogger
      </h3>
    </div>
  </header>
  <main>
    <router-view v-slot="{Component}">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer>
    <div class="d-flex justify-content-center" id="footer">
      <radial-menu />
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import RadialMenu from './components/RadialMenu.vue'

export default {
  components: { RadialMenu },
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

#footer{
  height: 12vh;
  background-color: rgb(56, 12, 12);
}
#logo {
  font-family: "Press Start 2P", cursive;
  background-color: rgb(56, 12, 12);

}
</style>

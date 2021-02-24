<template>
  <div class="radial-menu">
    <button class="btn rounded-circle"
            @click="state.radialOpen = !state.radialOpen"
    >
      <i class="
            fa
            fa-dice-d20
            fa-3x"
         id="dice"
      >
      </i>
    </button>
    <div
      class="radial p-0"
      :class="{ show: state.radialOpen }"
    >
      <button class="btn btn-lg rounded-circle" id="btn-1">
        <i class="fas fa-dice-d20"></i>
      </button>
      <button class="btn btn-lg rounded-circle" id="btn-2">
        <i class="fas fa-scroll"></i>
      </button>
      <button class="btn btn-lg rounded-circle" id="btn-3">
        <i class="fas fa-dungeon"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'RadialMenu',
  setup() {
    const state = reactive({
      radialOpen: true
    })
    return {
      state

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.radial {
  // width: 50vw;
  // position: absolute;
  transform: scale(0) ;
  transition: all 0.15s ease-out;

}
.radial.show {
  // transform-origin: left;
  transform: scale(1);
  // margin-right: 200px;
  // animation-direction: right;

}
#dice{
  color: rgb(163, 25, 25);
}
#dice:hover{
color: rgb(255, 255, 255);
}

#btn-1{
  position: absolute;
  background-color: rgb(255, 255, 255);
  bottom: 6vh;
  margin-left: auto;
  margin-right: auto;
  left: -12vw;
  right: 18vw;
}

#btn-1:hover{
  background-color: rgb(73, 65, 65);
}
#btn-2{
  position: absolute;
  background-color: rgb(255, 255, 255);
  bottom: 10vh;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}
#btn-2:hover{
  background-color: rgb(73, 65, 65);
}
#btn-3{
  position: absolute;
  background-color: rgb(255, 255, 255);
  bottom: 6vh;
  margin-left: auto;
  margin-right: auto;
  left: 12vw;
  right: -18vw;
}
#btn-3:hover{
  background-color: rgb(73, 65, 65);
}
</style>

<template>
  <div class="radial-menu">
    <button class="btn rounded-circle">
      <i class="fa fa-dice-d20 fa-3x" id="dice"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'RadialMenu',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
#dice{
  color: rgb(163, 25, 25);
}
#dice:hover{
color: rgb(214, 214, 214);
}
</style>

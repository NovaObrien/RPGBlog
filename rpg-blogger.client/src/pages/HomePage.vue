<template>
  <div class="home-page container-fluid">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10 overflow-auto" id="blogs">
        <Blog v-for="blog in blogs" :blog-props="blog" :key="blog.id" />
      </div>
      <div class="col-1 sides"></div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { blogService } from '../services/BlogService'
import { AppState } from '../AppState'
export default {
  name: 'HomePage',
  setup() {
    onMounted(() => {
      blogService.getBlogs()
    })
    return {
      blogs: computed(() => AppState.blogs)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@media (min-width: 575.98px){
  ::-webkit-scrollbar {
    width: 10px;
}
    }
    @media (min-width: 575.98px){
      /* Track */
::-webkit-scrollbar-track {
  /* background: #362B24; */
 box-shadow: inset 0 0 5px rgb(0, 0, 0);
  border-radius: 10px;
}
  }
  @media (min-width: 575.98px){
    /* Handle */
::-webkit-scrollbar-thumb {
  background: #661a1a;
  border-radius: 10px;
}
  }
  @media (min-width: 575.98px){
    /* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #411b15;
  }
}
#border{
  background-color: rgba(73, 32, 40, 0.705);
}
#blogs{
  height: 81vh;
}
</style>

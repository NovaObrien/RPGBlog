<template>
  <div class="home-page container-fluid">
    <div class="row" id="post">
      <div class="col-3 mr-3" id="border"></div>
      <div class="col-4 overflow-auto-y">
        <Blog v-for="blog in blogs" :blog-props="blog" :key="blog.id" />
      </div>
      <div class="col ml-3" id="border"></div>
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
#border{
  background-color: rgba(73, 32, 40, 0.705);
}
#post{
  height: 81vh;
}
</style>

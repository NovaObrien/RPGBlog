<template>
  <div class="home-page container-fluid">
    <div class="row">
      <div class="col overflow-auto">
        <Blog v-for="blog in blogs" :blog-props="blog" :key="blog.id" />
      </div>
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

</style>

<template>
  <div class="active-blog-page container-fluid">
    <div class="row">
      <div class="col-1">
      </div>
      <div class="activeBlog col-10 overflow-auto">
        <h3>
          {{ activeBlog.title }}
        </h3>
        <p class="bg-red p-1 rounded d-flex justify-content-end">
          {{ activeBlog.createdBy }}
        </p>
        <p>
          {{ activeBlog.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { useRoute } from 'vue-router'
export default {
  name: 'ActiveBlogPage',
  setup() {
    const route = useRoute()
    onMounted(() => {
      blogService.getActiveBlog(route.params.blogId)
    })
    return {
      activeBlog: computed(() => AppState.activeBlog)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.activeBlog{
  height: 82vh;
  background-color: rgb(214, 214, 214);
}
.bg-red{
  background-color: rgba(73, 11, 11, 0.377);
}
</style>

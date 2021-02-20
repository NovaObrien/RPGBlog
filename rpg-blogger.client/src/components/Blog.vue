<template>
  <div class="Blog p-1 bg-gray my-3">
    <h3 @click="setActiveBlog">
      {{ blog.title }}
    </h3>
    <h5 class="d-flex justify-content-end bg-gray">
      User: {{ blog.createdBy }}
    </h5>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Blog',
  props: {
    blogProps: Object
  },
  setup(props) {
    const router = useRouter()
    return {
      blog: computed(() => props.blogProps),
      setActiveBlog() {
        router.push({ name: 'ActiveBlog', params: { blogId: props.blogProps._id } })
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.bg-gray{
  background-color: rgba(128, 128, 128, 0.301);
}
</style>

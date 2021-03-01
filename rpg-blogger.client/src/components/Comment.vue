<template>
  <div class="comment">
    {{ comment.content }}
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'Comment',
  props: {
    commentProp: Object
  },
  setup(props) {
    return {
      comment: computed(() => props.commentProp)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

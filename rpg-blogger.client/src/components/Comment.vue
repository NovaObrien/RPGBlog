<template>
  <div class="comment row">
    <div class="col bg-light">
      <div class="row d-flex justify-content-end p-1 bg-red mx-1 mt-4 rounded-top">
        {{ comment.createdBy }}
      </div>
      <div class="row mx-1 pb-3 rounded-bottom bg-dark text-light">
        {{ comment.content }}
      </div>
    </div>
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
.bg-red{
  background-color: rgba(73, 11, 11, 0.377);
}
</style>

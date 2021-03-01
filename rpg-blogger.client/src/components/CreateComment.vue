<template>
  <div class="create-comment">
    <!-- <button class="btn btn-effects"
            data-toggle="modal"
            data-target="#replyModal"
    >
      <i class="fas fa-scroll"></i>
      Reply
    </button> -->

    <!-- Modal -->
    <div>
      <form class="form-group" @submit.prevent="createComment">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Reply
          </h5>
        </div>
        <div class="modal-body">
          <!-- <label for=""></label> -->
          <textarea
            class="form-control rounded-0 mt-3"
            rows="10"
            name=""
            id=""
            aria-describedby="Body"
            placeholder="Comment..."
            v-model="state.newComment.content"
          />
          <button type="submit" class="btn btn-secondary">
            Post
          </button>
        </div>
        <div class="modal-footer">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { commentService } from '../services/CommentService'
import { useRoute } from 'vue-router'
export default {
  name: 'CreateComment',
  setup() {
    const route = useRoute()
    const state = reactive({
      newComment: {}
    })
    return {
      state,
      createComment() {
        state.newComment.blogId = route.params.blogId
        commentService.createComment(state.newComment)
        state.newComment = {}
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.btn-effects{
  background-color: rgb(255, 255, 255);

}

.btn-effects:hover{
  background-color: rgb(146, 146, 146);
}
</style>

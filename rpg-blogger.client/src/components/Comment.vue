<template>
  <div class="comment row">
    <div class="col bg-light mt-3 rounded">
      <div class="row d-flex justify-content-end p-1 bg-secondary mx-1 mt-3 rounded">
        {{ comment.createdBy }}
      </div>
      <div class="row mx-1 my-2 pb-3 rounded bg-light">
        {{ comment.content }}
      </div>

      <!-- DropDown -->

      <div class="comment-options row">
        <button class="btn btn-dark text-danger ml-1 mb-1" @click="state.dropOpen = !state.dropOpen">
          <i class="fas fa-angle-double-right"></i>
        </button>
        <div
          class="dropdown p-0"
          :class="{ show: state.dropOpen }"
        >
          <!-- <button @click="removeUser">
          Yes
          </button> -->
          <button class="btn btn-dark text-danger" v-if="comment.createdBy != user.name" @click="reportComment">
            Report
          </button>
          <button class="btn btn-dark text-danger"
                  data-toggle="modal"
                  data-target="#editCommentModal"
                  v-if="comment.createdBy == user.name"
          >
            <i class="fas fa-scroll">
            </i>
          </button>

          <!-- Delete Comment -->
          <button class="btn btn-dark text-danger" v-if="comment.createdBy == user.name" @click="deleteComment(comment.id)">
            <i class="fas fa-skull-crossbones">
            </i>
          </button>
          <button class="btn btn-dark text-danger" @click="state.dropOpen = !state.dropOpen">
            <i class="fas fa-angle-double-left"></i>
          </button>
        </div>
        <!-- editModal -->
        <div
          class="modal fade"
          id="editCommentModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="editedModalLong"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <form class="form-group" @submit.prevent="editComment">
                <div class="modal-header">
                  <h5 class="modal-title" id="editedModalLong">
                    Edit Comment
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="editedTitle"
                    placeholder="Title..."
                    v-model="state.editedComment.title"
                  />
                  <textarea
                    class="form-control rounded-0 mt-3"
                    rows="15"
                    name=""
                    id=""
                    aria-describedby="editedBody"
                    placeholder="Content goes here..."
                    v-model="state.editedComment.content"
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import Swal from 'sweetalert2'
import { commentService } from '../services/CommentService'
import { AppState } from '../AppState'
export default {
  name: 'Comment',
  props: {
    commentProp: Object
  },
  setup(props) {
    const state = reactive({
      dropOpen: false,
      editedComment: props.commentProp
    })
    return {
      state,
      comment: computed(() => props.commentProp),
      user: computed(() => AppState.account),
      deleteComment(id) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            commentService.deleteComment(id)
          }
        })
      },
      async reportComment() {
        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputLabel: 'To help us better identify the issue please give a short description of the violation. eg hate speech, personal info listed, or not rpg content related',
          text: 'Report Comment',
          inputPlaceholder: 'Reason For Report...',
          inputAttributes: {
            'aria-label': ''
          },
          showCancelButton: true
        })

        if (text) {
          Swal.fire('Thank you for keeping our community safe')
        }
      },
      editComment() {
        commentService.editComment(state.editedComment)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.dropdown {
  width: 50vw;
  position: absolute;
  transform-origin: left;
  transform: scaleX(0) ;
  transition: all 0.15s ease-out;

}
.dropdown.show {
  transform-origin: left;
  transform: scaleX(1);
  margin-right: 200px;
  animation-direction: left;
}
</style>

<template>
  <div class="create-blog">
    <button
      type="button"
      class="btn btn-lg rounded-circle"
      id="btn-2"
      data-toggle="modal"
      data-target="#exampleModalLong"
    >
      <i class="fas fa-scroll"></i>
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form class="form-group" @submit.prevent="createBlog">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Create a Post...
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
              <!-- <label for=""></label> -->
              <input
                type="text"
                class="form-control"
                name=""
                id=""
                aria-describedby="titleId"
                placeholder="Title..."
                v-model="state.newBlog.title"
              />
              <textarea
                class="form-control rounded-0 mt-3"
                rows="15"
                name=""
                id=""
                aria-describedby="Body"
                placeholder="Content goes here..."
                v-model="state.newBlog.body"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { blogService } from '../services/BlogService'
export default {
  name: 'CreateBlog',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    return {
      state,
      createBlog() {
        blogService.createBlogs(state.newBlog)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
#btn-2{
  position: absolute;
  background-color: rgb(255, 255, 255);
  bottom: 10vh;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}
#btn-2:hover{
  background-color: rgb(73, 65, 65);
}
</style>

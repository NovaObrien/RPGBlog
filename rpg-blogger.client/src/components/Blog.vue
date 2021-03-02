<template>
  <div class="Blog row p-1 bg-light my-3 rounded">
    <div class="col">
      <div class="row" @click="setActiveBlog">
        <h5 class="font pb-4 ml-1">
          {{ blog.title }}
        </h5>
      </div>

      <p class="d-flex justify-content-end bg-secondary rounded p-2">
        {{ blog.createdBy }}
      </p>
      <div class="blog-options row">
        <button class="btn btn-dark text-danger" @click="state.dropOpen = !state.dropOpen">
          <i class="fas fa-angle-double-right"></i>
        </button>
        <div
          class="dropdown p-0"
          :class="{ show: state.dropOpen }"
        >
          <!-- <button @click="removeUser">
          Yes
          </button> -->
          <button class="btn btn-dark text-danger" v-if="blog.createdBy != user.name" @click="reportBlog">
            Report
          </button>
          <button class="btn btn-dark text-danger"
                  data-toggle="modal"
                  data-target="#editBlogModal"
                  v-if="blog.createdBy == user.name"
          >
            <i class="fas fa-scroll">
            </i>
          </button>

          <!-- Delete Blog -->
          <button class="btn btn-dark text-danger" v-if="blog.createdBy == user.name" @click="deleteBlog(blog.id)">
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
          id="editBlogModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="editedModalLong"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <form class="form-group" @submit.prevent="editBlog">
                <div class="modal-header">
                  <h5 class="modal-title" id="editedModalLong">
                    Edit Blog
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
                    v-model="state.editedBlog.title"
                  />
                  <textarea
                    class="form-control rounded-0 mt-3"
                    rows="15"
                    name=""
                    id=""
                    aria-describedby="editedBody"
                    placeholder="Content goes here..."
                    v-model="state.editedBlog.content"
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
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import Swal from 'sweetalert2'
import { blogService } from '../services/BlogService'

export default {
  name: 'Blog',
  props: {
    blogProps: Object
  },

  setup(props) {
    const state = reactive({
      dropOpen: false,
      editedBlog: props.blogProps
    })
    const router = useRouter()
    return {
      state,
      blog: computed(() => props.blogProps),
      user: computed(() => AppState.account),
      setActiveBlog() {
        router.push({ name: 'ActiveBlog', params: { blogId: props.blogProps._id } })
      },
      deleteBlog(id) {
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
            blogService.removeActiveBlog(id)
          }
        })
      },
      async reportBlog() {
        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputLabel: 'To help us better identify the issue please give a short description of the violation. eg hate speech, personal info listed, or not rpg content related',
          text: 'Report Blog',
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
      editBlog() {
        blogService.editBlog(state.editedBlog)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.font{
  font-family: 'DotGothic16', sans-serif;
}
.font:hover{
  color: rgb(136, 43, 43);
  cursor: pointer;
}
.bg-gray{
  background-color: rgb(214, 214, 214);
}

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

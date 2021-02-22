<template>
  <div class="Blog row p-1 bg-gray my-3 rounded">
    <div class="col-11">
      <div class="row">
        <h3 @click="setActiveBlog">
          {{ blog.title }}
        </h3>
      </div>
      <div class="row">
        <h5 class="d-flex justify-content-end bg-gray">
          User: {{ blog.createdBy }}
        </h5>
      </div>
    </div>
    <div class="col mt-5 mr-auto">
      <div class="blog-options row">
        <button class="btn btn-dark text-danger" @click="state.dropOpen = !state.dropOpen">
          <i class="fas fa-caret-square-down"></i>
        </button>
        <div
          class="dropdown-menu p-0 list-group w-100"
          :class="{ show: state.dropOpen }"
        >
          <!-- <button @click="removeUser">
          Yes
        </button> -->
          <button class="btn btn-dark btn-block text-danger" v-if="blog.createdBy == user.name" @click="deleteBlog">
            <i class="fas fa-skull-crossbones">
            </i>
            Delete
          </button>
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

export default {
  name: 'Blog',
  props: {
    blogProps: Object
  },

  setup(props) {
    const state = reactive({
      dropOpen: false
    })
    const router = useRouter()
    return {
      state,
      blog: computed(() => props.blogProps),
      user: computed(() => AppState.account),
      setActiveBlog() {
        router.push({ name: 'ActiveBlog', params: { blogId: props.blogProps._id } })
      },
      deleteBlog() {
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
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
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
</style>

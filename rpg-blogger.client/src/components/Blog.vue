<template>
  <div class="Blog row p-1 bg-gray my-3 rounded">
    <div class="col">
      <div class="row">
      </div>
      <div class="row">
        <h5 @click="setActiveBlog">
          {{ blog.title }}
        </h5>
      </div>

      <p class="d-flex justify-content-end bg-red rounded p-2">
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
          <button class="btn btn-dark text-danger" v-if="blog.createdBy == user.name" @click="deleteBlog">
            <i class="fas fa-skull-crossbones">
            </i>
          </button>
          <button class="btn btn-dark text-danger" v-if="blog.createdBy == user.name" @click="deleteBlog">
            <i class="fas fa-skull-crossbones">
            </i>
          </button>
          <button class="btn btn-dark text-danger" v-if="blog.createdBy == user.name" @click="deleteBlog">
            <i class="fas fa-skull-crossbones">
            </i>
          </button>
          <button class="btn btn-dark text-danger" @click="state.dropOpen = !state.dropOpen">
            <i class="fas fa-angle-double-left"></i>
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
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
// @media (min-width: 575.98px){
// .info-card{
//   width: 45%;
//   height: fit-content;
//   position:absolute;
//   top: 15%;
//   right: 5%;
// }
// }
.bg-gray{
  background-color: rgb(214, 214, 214);
}
.bg-red{
  background-color: rgba(73, 11, 11, 0.377);
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

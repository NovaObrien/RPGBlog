<template>
  <div class="active-blog-page container-fluid ">
    <div class="row">
      <div class="col-1">
      </div>
      <div class="activeBlog col-10 overflow-auto">
        <div class="row">
          <div class="col bg-light rounded my-1 pb-1">
            <h3 class="font">
              {{ activeBlog.title }}
            </h3>
            <p class="bg-secondary p-1 rounded d-flex justify-content-end">
              {{ activeBlog.createdBy }}
            </p>
            <p>
              {{ activeBlog.content }}
            </p>
          </div>
        </div>
        <comment v-for="c in comments" :comment-prop="c" :key="c.id" />
        <div class="row">
          <create-comment />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { useRoute } from 'vue-router'
import { commentService } from '../services/CommentService'
export default {
  name: 'ActiveBlogPage',
  setup() {
    const route = useRoute()
    onMounted(() => {
      blogService.getActiveBlog(route.params.blogId)
      commentService.getComments(route.params.blogId)
    })
    return {
      activeBlog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.activeBlog{
  height: 82vh;
}
.font{
  font-family: 'DotGothic16', sans-serif;
}
@media (min-width: 575.98px){
  ::-webkit-scrollbar {
    width: 10px;
}
    }
    @media (min-width: 575.98px){
      /* Track */
::-webkit-scrollbar-track {
  /* background: #362B24; */
 box-shadow: inset 0 0 5px rgb(0, 0, 0);
  border-radius: 10px;
}
  }
  @media (min-width: 575.98px){
    /* Handle */
::-webkit-scrollbar-thumb {
  background: #661a1a;
  border-radius: 10px;
}
  }
  @media (min-width: 575.98px){
    /* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #411b15;
  }
}
</style>

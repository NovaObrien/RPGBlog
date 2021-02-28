<template>
  <div class="radial-menu">
    <button class="btn rounded-circle"
            @click="state.radialOpen = !state.radialOpen"
    >
      <i class="
            fa
            fa-dice-d20
            fa-3x"
         id="dice"
      >
      </i>
    </button>
    <div
      class="radial p-0"
      :class="{ show: state.radialOpen }"
    >
      <button class="btn btn-lg rounded-circle" id="btn-1" @click="home">
        <i class="fas fa-dice-d20"></i>
      </button>

      <button class="btn btn-lg rounded-circle"
              id="btn-2"
              data-toggle="modal"
              data-target="#exampleModalLong"
      >
        <i class="fas fa-scroll"></i>
      </button>

      <button class="btn btn-lg rounded-circle" id="btn-3" @click="profile">
        <i class="fas fa-dungeon"></i>
      </button>
    </div>

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
import router from '../router'
import { blogService } from '../services/BlogService'
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'

export default {
  name: 'RadialMenu',
  setup() {
    const state = reactive({
      radialOpen: false,
      newBlog: {}
    })
    return {
      state,
      home() {
        router.push({ name: 'Home' })
      },
      profile() {
        router.push({ name: 'Account' })
      },
      async createBlog() {
        if (AppState.account != null) {
          await AuthService.loginWithPopup()
        } else {
          blogService.createBlogs(state.newBlog)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.radial {
  // width: 50vw;
  // position: absolute;
  transform: scale(0) ;
  transition: all 0.15s ease-out;

}
.radial.show {
  // transform-origin: left;
  transform: scale(1);
  // margin-right: 200px;
  // animation-direction: right;

}
#dice{
  color: rgb(163, 25, 25);
}
#dice:hover{
color: rgb(255, 255, 255);
}

#btn-1{
  position: absolute;
  background-color: rgb(255, 255, 255);
  bottom: 6vh;
  margin-left: auto;
  margin-right: auto;
  left: -12vw;
  right: 18vw;
}

#btn-1:hover{
   background-color: rgb(146, 146, 146);
}
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
   background-color: rgb(146, 146, 146);
}
#btn-3{
  position: absolute;
  background-color: rgb(255, 255, 255);
  bottom: 6vh;
  margin-left: auto;
  margin-right: auto;
  left: 12vw;
  right: -18vw;
}
#btn-3:hover{
   background-color: rgb(146, 146, 146);
}
</style>

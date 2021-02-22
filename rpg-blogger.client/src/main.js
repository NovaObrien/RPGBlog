// @ts-ignore
import App from './App.vue'
import { createApp } from 'vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import router from './router'
import bootstrap from 'bootstrap'
import jquery from 'jquery'
import popper from 'popper.js'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router, bootstrap, jquery, popper, VueSweetalert2)
  .mount('#app')

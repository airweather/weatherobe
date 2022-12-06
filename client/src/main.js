import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'
import store from './store'

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App);

app.use(router).mixin(mixins).use(store).mount('#app');

window.Kakao.init("f60881d86d2be74dd12737ba176d9dac");

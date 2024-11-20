

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/route/index.js";
import './assets/css/style.css';
import './assets/scss/style.scss'
import './assets/fonts/fontawesome-webfont.eot'



createApp(App)
    .use(router)

    .mount('#app');

// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// app.component('DataTable', DataTable)
// app.component('Column', Column)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0HlvZT6aCef-ctNk5JWnTQvS-4w5_TuM",
  authDomain: "week7-jiayuan.firebaseapp.com",
  projectId: "week7-jiayuan",
  storageBucket: "week7-jiayuan.appspot.com",
  messagingSenderId: "853635114478",
  appId: "1:853635114478:web:781b7ff1ab9907a1179aff"
};

// Initialize Firebase
initializeApp(firebaseConfig);

app.mount('#app')

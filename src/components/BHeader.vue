<script setup>
// import { useAuthentication } from '../router/authentication'
// const { isAuthentication, logout } = useAuthentication()

import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
const Firebaselogout = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    alert("Logout successful!")
  }).catch((error) => {
    // An error happened.
    console.log("logout error", error)
  });
}
</script>

<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/booklist" class="nav-link" active-class="active">Book List</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/editbook" class="nav-link" active-class="active">Edit Book</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">Get All Book API</router-link>
        </li>

        <li class="nav-item" v-if="!isAuthentication">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/Firelogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>

        <li class="nav-item">
          <button @click="Firebaselogout" class="nav-link btn btn-link">Firebase Logout</button>
        </li>

        <li class="nav-item" v-if="isAuthentication">
          <button @click="logout" class="nav-link btn btn-link">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>
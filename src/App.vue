<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BHeader from './components/BHeader.vue';

const route = useRoute(); // Get the current route

// Create a computed property to determine if the header should be shown
const showHeader = computed(() => {
  return !route.name || !route.name.includes('countbookAPI'); // If route name doesn't include 'countbookAPI', show the header
});
</script>

<template>
  <!-- Use v-if to conditionally render the header -->
  <header v-if="showHeader">
    <BHeader />
  </header>

  <main>
    <!-- Dynamically render the page content -->
    <router-view></router-view>
  </main>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

/* Form styling */
.form {
  text-align: center;
  margin-top: 50px;
}

/* Focus and card styles */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}
</style>

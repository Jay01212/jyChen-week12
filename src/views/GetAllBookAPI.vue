<template>
    <div id="all-books" class="text-center mt-5">
        <h1 class="mb-4">Get All Books API</h1>

        <!-- Display JSON data using <pre> tag -->
        <pre v-if="jsonData" class="alert alert-info">{{ jsonData }}</pre>

        <p v-if="error" class="alert alert-danger">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const error = ref(null);
const jsonData = ref(null);

// Fetch all books and display JSON data
const getAllBooksAPI = async () => {
    try {
        const response = await axios.get('https://getallbooks-5g3nuumekq-uc.a.run.app');
        jsonData.value = JSON.stringify(response.data, null, 2);
        error.value = null;
    } catch (err) {
        console.error('Error fetching all books:', err);
        error.value = err.message;
        jsonData.value = null;
    }
};

// Call API when the component is mounted
onMounted(() => {
    getAllBooksAPI();
});
</script>

<style scoped>
#all-books {
    max-width: 600px;
    margin: 0 auto;
}
</style>

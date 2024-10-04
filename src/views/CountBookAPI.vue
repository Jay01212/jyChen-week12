<template>
    <div id="book-count" class="text-center mt-5">
        <h1 class="mb-4">Book Count API</h1>

        <!-- Display JSON data using <pre> tag -->
        <pre v-if="jsonData" class="alert alert-info">{{ jsonData }}</pre>

        <!-- Display the extracted count -->
        <p v-if="count !== null" class="alert alert-success">Total Book Count: {{ count }}</p>

        <p v-if="error" class="alert alert-danger">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const count = ref(null);
const error = ref(null);
const jsonData = ref(null);

// Fetch book count and display JSON data
const getBookCountAPI = async () => {
    try {
        const response = await axios.get('https://countbooks-5g3nuumekq-uc.a.run.app');
        jsonData.value = JSON.stringify(response.data, null, 2); // Format JSON data
        count.value = response.data.count; // Extract count
        error.value = null;
    } catch (err) {
        console.error('Error fetching book count:', err);
        error.value = err.message;
        count.value = null;
        jsonData.value = null;
    }
};

// Call API when the component is mounted
onMounted(() => {
    getBookCountAPI();
});
</script>

<style scoped>
#book-count {
    max-width: 600px;
    margin: 0 auto;
}
</style>

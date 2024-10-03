<template>
    <div id="book-count" class="text-center mt-5">
        <h1 class="mb-4">Book Counter</h1>
        <button @click="getBookCount" class="btn btn-primary mb-3">Get Book Count</button>

        <p v-if="count !== null" class="alert alert-success">Total number of books: {{ count }}</p>
        <p v-if="error" class="alert alert-danger">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const count = ref(null);
const error = ref(null);

const getBookCount = async () => {
    try {
        const response = await axios.get('https://countbooks-5g3nuumekq-uc.a.run.app');
        count.value = response.data.count;
        error.value = null;
    } catch (err) {
        console.error('Error fetching book count:', err);
        error.value = err.message;
        count.value = null;
    }
};
</script>

<style scoped>
#book-count {
    max-width: 600px;
    margin: 0 auto;
}
</style>
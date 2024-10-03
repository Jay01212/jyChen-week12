<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h1 class="text-center mb-4">Add Book</h1>
                <form @submit.prevent="addBook" class="narrow-form">
                    <div class="mb-3">
                        <label for="isbn" class="form-label">ISBN</label>
                        <input type="text" class="form-control bg-white" id="isbn" v-model="isbn" required
                            placeholder="Enter ISBN number">
                        <p v-if="isbnError" class="text-danger">{{ isbnError }}</p>
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Book Name</label>
                        <input type="text" class="form-control bg-white" id="name" v-model="name" required
                            placeholder="Enter book name">
                        <p v-if="nameError" class="text-danger">{{ nameError }}</p>
                    </div>
                    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
                    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
                    <div class="d-flex justify-content-center gap-2">
                        <button type="submit" class="btn btn-primary" :disabled="loading">Add Book</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const isbn = ref('');
        const name = ref('');
        const isbnError = ref('');
        const nameError = ref('');
        const successMessage = ref('');
        const errorMessage = ref('');
        const loading = ref(false);

        const validateForm = () => {
            isbnError.value = '';
            nameError.value = '';
            let valid = true;

            // ISBN validation
            const isbnNumber = Number(isbn.value);
            if (isNaN(isbnNumber)) {
                isbnError.value = 'ISBN must be a valid number';
                valid = false;
            }

            // Name validation
            if (!name.value.trim()) {
                nameError.value = 'Book name cannot be empty';
                valid = false;
            }

            return valid;
        };

        const addBook = async () => {
            if (!validateForm()) return;

            loading.value = true;
            successMessage.value = '';
            errorMessage.value = '';

            try {
                const response = await axios.post('https://addbook-5g3nuumekq-uc.a.run.app', {
                    isbn: Number(isbn.value),
                    name: name.value
                });

                successMessage.value = response.data.message; // Adjust based on your cloud function response
                clearForm();
            } catch (error) {
                errorMessage.value = 'Error adding book: ' + error.message;
            } finally {
                loading.value = false;
            }
        };

        const clearForm = () => {
            isbn.value = '';
            name.value = '';
            isbnError.value = '';
            nameError.value = '';
        };

        return {
            isbn,
            name,
            isbnError,
            nameError,
            successMessage,
            errorMessage,
            loading,
            addBook,
            clearForm
        };
    }
};
</script>

<style scoped>
.narrow-form {
    max-width: 300px;
    margin: 0 auto;
}

.form-control {
    border: 1px solid #ced4da;
}

.btn-primary {
    background-color: #275fda;
    border-color: #4285f4;
}

.btn-primary:hover {
    background-color: #1c4cb3;
    border-color: #1c4cb3;
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
}

.btn-secondary:hover {
    background-color: #5a6268;
    border-color: #5a6268;
}

.text-danger {
    color: red;
}
</style>

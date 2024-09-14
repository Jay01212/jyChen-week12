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
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control bg-white" id="name" v-model="name" required
                            placeholder="Enter book name">
                    </div>
                    <div class="d-flex justify-content-center gap-2">
                        <button type="submit" class="btn btn-primary">Add Book</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import db from '../Firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';

import BookList from '@/components/BookList.vue';

export default {
    setup() {
        const isbn = ref('');
        const name = ref('');

        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }

                await addDoc(collection(db, 'books'), {
                    isbn: isbnNumber,
                    name: name.value
                });
                isbn.value = '';
                name.value = '';
                alert('Book added successfully!');
            } catch (error) {
                console.error('Error adding book: ', error);
            }
        };

        const clearForm = () => {
            isbn.value = '';
            name.value = '';
        };

        return {
            isbn,
            name,
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
</style>
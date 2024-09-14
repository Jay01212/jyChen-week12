<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h1 class="text-center mb-4">Edit Book</h1>
                <form @submit.prevent="updateBook" class="narrow-form">
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
                        <button type="submit" class="btn btn-primary">Update Book</button>
                        <button type="button" class="btn btn-danger" @click="deleteBook">Delete Book</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../Firebase/init.js';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export default {
    props: {
        bookId: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const isbn = ref('');
        const name = ref('');

        // Fetch book details based on bookId
        const fetchBookDetails = async () => {
            const bookRef = doc(db, 'books', props.bookId);
            const bookSnap = await getDoc(bookRef);
            if (bookSnap.exists()) {
                const bookData = bookSnap.data();
                isbn.value = bookData.isbn;
                name.value = bookData.name;
            } else {
                alert('No such book found');
            }
        };

        const updateBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }

                const bookRef = doc(db, 'books', props.bookId);
                await updateDoc(bookRef, {
                    isbn: isbnNumber,
                    name: name.value
                });
                alert('Book updated successfully!');
            } catch (error) {
                console.error('Error updating book: ', error);
            }
        };

        const deleteBook = async () => {
            try {
                const bookRef = doc(db, 'books', props.bookId);
                await deleteDoc(bookRef);
                alert('Book deleted successfully!');
            } catch (error) {
                console.error('Error deleting book: ', error);
            }
        };

        const clearForm = () => {
            isbn.value = '';
            name.value = '';
        };

        onMounted(() => {
            fetchBookDetails();
        });

        return {
            isbn,
            name,
            updateBook,
            deleteBook,
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

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
}

.btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
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
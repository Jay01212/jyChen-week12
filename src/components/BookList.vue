<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h1 class="text-center mb-4">Book List</h1>
                <div class="mb-3">
                    <label for="isbnFilter" class="form-label">ISBN Filter:</label>
                    <select id="isbnFilter" v-model="isbnFilter" class="form-select" @change="fetchBooks">
                        <option value="greater">ISBN > 1000</option>
                        <option value="less">ISBN < 1000</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="sortOrder" class="form-label">Sort by:</label>
                    <select id="sortOrder" v-model="sortOrder" class="form-select" @change="fetchBooks">
                        <option value="asc">ascending order</option>
                        <option value="desc">descending order</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="limitCount" class="form-label">Number of displays:</label>
                    <input type="number" id="limitCount" v-model="limitCount" min="1" max="50" class="form-control"
                        @change="fetchBooks">
                </div>
                <ul class="list-group">
                    <li v-for="book in books" :key="book.id" class="list-group-item">
                        {{ book.name }} - ISBN: {{ book.isbn }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../Firebase/init.js';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export default {
    setup() {
        const books = ref([]);
        const sortOrder = ref('desc');
        const limitCount = ref(10000);
        const isbnFilter = ref('greater');

        const fetchBooks = async () => {
            try {
                const isbnCondition = isbnFilter.value === 'greater'
                    ? where('isbn', '>', 1000)
                    : where('isbn', '<', 1000);

                const q = query(
                    collection(db, 'books'),
                    isbnCondition,
                    orderBy('isbn', sortOrder.value),
                    limit(parseInt(limitCount.value))
                );
                const querySnapshot = await getDocs(q);
                const booksArray = [];
                querySnapshot.forEach((doc) => {
                    booksArray.push({ id: doc.id, ...doc.data() });
                });
                books.value = booksArray;
            } catch (error) {
                console.error('Error in getting books', error);
            }
        };

        onMounted(() => {
            fetchBooks();
        });

        return {
            books,
            sortOrder,
            limitCount,
            isbnFilter,
            fetchBooks
        };
    }
};
</script>

<style scoped>
.container {
    max-width: 1000px;
    text-align: center;
}

h1 {
    color: #000;
}

.list-group-item {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    text-align: left;
}

.list-group-item:hover {
    background-color: #e9ecef;
    cursor: pointer;
}

.mt-5 {
    margin-top: 3rem !important;
}

.mb-3,
.mb-4 {
    margin-bottom: 1rem !important;
}

.text-center {
    text-align: center !important;
}

.form-select,
.form-control {
    max-width: 200px;
    margin: 0 auto;
}
</style>
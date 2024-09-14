<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="text-center mb-4">Books with ISBN > 1000</h1>
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
  import { collection, query, where, getDocs } from 'firebase/firestore';
  
  export default {
    setup() {
      const books = ref([]);
  
      const fetchBooks = async () => {
        try {
          const q = query(collection(db, 'books'), where('isbn', '>', 1000));
          const querySnapshot = await getDocs(q);
          const booksArray = [];
          querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
          });
          books.value = booksArray;
        } catch (error) {
          console.error('Error fetching books: ', error);
        }
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books
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
  }
  
  .list-group-item:hover {
    background-color: #e9ecef;
    cursor: pointer;
  }
  
  .mt-5 {
    margin-top: 3rem !important;
  }
  
  .mb-4 {
    margin-bottom: 1.5rem !important;
  }
  
  .text-center {
    text-align: center !important;
  }
  </style>
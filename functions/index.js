/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
// const logger = require("firebase-functions/logger");

admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Functions for counting books
exports.countBooks = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            // Get a collection of books
            const bookCollection = admin.firestore().collection("books");
            // Fix the variable name and get the snapshot correctly
            const snapshot = await bookCollection.get();
            const count = snapshot.size;

            // Return the number of books
            res.status(200).send({ count });
        } catch (error) {
            // Catch the error and return a 500 response
            console.error("Error counting books:", error.message);
            res.status(500).send("Error counting books");
        }
    });
});

// Functions to add books
exports.addBook = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            // Get ISBN and name from the request body
            const { isbn, name } = req.body;

            // Ensure ISBN and name are valid
            if (!isbn || isNaN(isbn) || !name || name.trim() === "") {
                return res.status(400).send("Invalid ISBN or name");
            }

            // Add the book to Firestore
            const bookRef = admin.firestore().collection("books").doc();
            await bookRef.set({
                isbn: Number(isbn),
                name: name.toUpperCase() // Convert book name to uppercase
            });

            // Return success message
            res.status(201).send({ message: "Book added successfully!" });
        } catch (error) {
            // Catch the error and return a 500 response
            console.error("Error adding book:", error.message);
            res.status(500).send("Error adding book");
        }
    });
});

// Function to get all books
exports.getAllBooks = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            // Get a collection of books
            const bookCollection = admin.firestore().collection("books");
            const snapshot = await bookCollection.get();

            // Map the snapshot to an array of book objects
            const books = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Return the list of books
            res.status(200).send(books);
        } catch (error) {
            // Catch the error and return a 500 response
            console.error("Error fetching books:", error.message);
            res.status(500).send("Error fetching books");
        }
    });
});

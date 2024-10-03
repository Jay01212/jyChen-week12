/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
// const logger = require("firebase-functions/logger");

admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.countBooks = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            // Get a collection of books
            const bookCollection = admin.firestore().collection("books");
            // Fix the variable name and get the snapshot correctly
            const snapshot = await bookCollection.get();
            const count = snapshot.size;

            // Return the number of books
            res.status(200).send({count});
        } catch (error) {
            // Catch the error and return a 500 response
            console.error("Error counting books:", error.message);
            res.status(500).send("Error counting books");
        }
    });
});

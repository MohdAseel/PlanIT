/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// Replace with the relevant database name and collection
use("iitm");

// Update query
db.getCollection("User").updateOne(
  { _id: ObjectId("672e47836d63e8b43daa4ec9") },  // Use the specific _id of the document
  {
    $set: {
      scheduled_events: [
        { eventId: "TAIC0001" },
        { eventId: "TAIC0002" }
      ]
    }
  }
);

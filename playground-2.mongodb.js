/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'auth-db';
const collection = 'users';

use(database);
db.users.insertMany([
    { : "student1@smail.iitm.ac.in", password: "password1", role: "normal" },
    { email: "student2@smail.iitm.ac.in", password: "password2", role: "normal" },
    { email: "student3@smail.iitm.ac.in", password: "password3", role: "head" },
    { email: "student4@smail.iitm.ac.in", password: "password4", role: "normal" },
    { email: "student5@smail.iitm.ac.in", password: "password5", role: "head" },
  ])
  
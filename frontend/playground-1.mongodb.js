use("iitm");

db.Userskksd.updateOne(
    { email: "da24b014@smail.iitm.ac.in" }, // filter by the user's email or any other unique field
    { $set: { role: "admin" } } // update the role to "admin"
);

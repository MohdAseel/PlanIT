/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

use("auth-db");

db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email", "password"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                email: {
                    bsonType: "string",
                    pattern: "@smail.iitm.ac.in$",
                    description: "must be a valid IITM email address and is required"
                },
                password: {
                    bsonType: "string",
                    minLength: 8,
                    description: "must be a string and is required"
                },
                role: {
                    bsonType: "string",
                    enum: ["admin", "student"],
                    default: "student",
                    description: "must be either 'admin' or 'student'"
                },
                classname: {
                    bsonType: "string",
                    default: "CSE",
                    description: "default class is 'CSE'"
                },
                personal_events: {
                    bsonType: "object",
                    properties: {
                        id: { bsonType: "string", description: "event ID is required" },
                        title: { bsonType: "string", description: "event title is required" },
                        startdate: { bsonType: "date", description: "start date is required" },
                        starttime: { bsonType: "string", description: "start time is optional" },
                        location: { bsonType: "string", description: "location is optional" }
                    }
                },
                Scheduled_events: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        description: "array of scheduled events"
                    }
                },
                Starred_clubs: {
                    bsonType: "array",
                    items: {
                        bsonType: "string",
                        description: "array of starred club names"
                    }
                }
            }
        }
    }
});



// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const CONTACTS_COLLECTION = "contacts";

const app = express();

app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// require the routes
const contacts = require('./src/routes/contacts');

// setup the routes
app.use('/', contacts);
app.use(errorHandler);
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", (err, client) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");
    app.db = db;
    // Initialize the app.
      const server = app.listen(process.env.PORT || 8080, () => {
      const port = server.address().port;
      console.log("App now running on set port", port);
    });
});

// Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
//     console.log("ERROR: " + reason);
//     res.status(code || 500).json({"error": message});
// }

function errorHandler (err, req, res, next) {
  res.status(500).json({"Common error": err.message}); 
}

  
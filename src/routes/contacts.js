const express = require('express');
const router = express.Router();
const async = require('async');
const CONTACTS_COLLECTION = "contacts";

router.get("/api/contacts", async function(req, res) {
    const db = req.app.db;
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get contacts.");
      } else {
        res.status(200).json(docs);
      }
    });
  });

  function handleError(res, reason, message, code) {
    console.log("ERROR from contacts.js: " + reason);
    res.status(code || 500).json({"error": message});
}

module.exports = router;
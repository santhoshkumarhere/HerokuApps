const express = require('express');
const router = express.Router();
const async = require('async');
const ObjectID = mongodb.ObjectID;

const CONTACTS_COLLECTION = "contacts";

router.get("/api/contacts", async function(req, res) {
    const db = req.app.db;
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        next(err);
      } else {
        res.status(200).json(docs);
      }
    });
  });


  router.post("/api/contacts", async function(req, res) {
    var newContact = req.body;
    newContact.createDate = new Date();
    const db = req.app.db;
    if (!req.body.name) {
        next(err);
    } else {
      db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
        if (err) {
            next(err);
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });
  
  
  router.get("/api/contacts/:id", async function(req, res) {
    const db = req.app.db;
      db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
            next(err);
        } else {
          res.status(200).json(doc);
        }
      });
    });
    
    router.put("/api/contacts/:id", async function(req, res) {
        const db = req.app.db;
      var updateDoc = req.body;
      delete updateDoc._id;
    
      db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, {$set: updateDoc}, function(err, doc) {
        if (err) {
            next(err);
        } else {
          updateDoc._id = req.params.id;
          res.status(200).json(updateDoc);
        }
      });
    });
    
    router.delete("/api/contacts/:id", async function(req, res) {
        const db = req.app.db;
      db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
         next(err);
        } else {
          res.status(200).json(req.params.id);
        }
      });
    });
  
module.exports = router;
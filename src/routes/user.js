const express = require("express");
const bodyParser = require("body-parser");
const userSchema = require("../models/user");

const router = express.Router();
router.use(bodyParser.json());

/*Create User*/
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

/*Get all users*/
router.get("/getuser", (req, res) => {
  const { name } = req.query;
  if (name) {
    userSchema
      .find({ FirstName: { $regex: name, $options: "i" } })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  } else {
    userSchema
      .find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  }
});

/*Get user by ID*/
router.get("/getuser/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

/*update a user*/
router.put("/getuser/:id", (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { FirstName, LastName, age, email } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// Delete a user
router.delete("/getuser/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;

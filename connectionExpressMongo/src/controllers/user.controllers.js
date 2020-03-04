const User = require("../models/user.model.js");
const basicAuth = require("express-basic-auth");
const { base64decode } = require("nodejs-base64");

//verifica la session con basic auth
exports.session = (req, res, next) => {
  app.use(function (req, res, next) {
    if (req.headers["authorization"]) {
      const token = req.headers['authorization'].split(' ')[1];
      try {
        //validate if token exists in the database
        Session.findOne({ token }, function (error, session) {
          if (error) {
            console.log('error', error);
            res.status(401);
            res.send({
              error: "Unauthorized "
            });
          }
          if (session) {
            next();
            return;
          } else {
            res.status(401);
            res.send({
              error: "Unauthorized "
            });
          }
        });
      } catch (e) {
        res.status(422);
        res.send({
          error: "There was an error: " + e.message
        });
      }
    } else {
      res.status(401);
      res.send({
        error: "Unauthorized "
      });
    }
  })
  // User.find()
  //   .then(users => {
  //     if (req.headers["authorization"]) {
  //       const authBase64 = req.headers["authorization"].split(" ");
  //       const emailPass = base64decode(authBase64[1]);
  //       const email = emailPass.split(":")[0];
  //       const password = emailPass.split(":")[1];
  //       users.forEach(element => {
  //         if (element.email === email && element.password === password) {
  //             res.send({ mensaje: `Bienvenido ${ element.first_name } `  });
  //           next();
  //           return;
  //         }
  //       });
  //     }
  //     res.status(401);
  //     res.send({
  //       error: "Unauthorized "
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Something went wrong while getting list of users."
  //     });
  // });
};

// Retrieve and return all users from the database
exports.findAll = (req, res) => {
    User.find()
      .then(users => {
        res.send(users);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Something went wrong while getting list of users."
        });
      });
  };
// Create a new User
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }

  // Create a new Userconst
  user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password
  });
  // Save user in the database
  user
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating new user."
      });
    });
};

// Find a single User with a id
exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }

      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error getting user with id " + req.params.id
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  User.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      address: req.body.address,
      password: req.body.password
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.id
      });
    });
};
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      res.send({
        message: "user deleted successfully!"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id
      });
    });
};

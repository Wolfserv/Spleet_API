const express = require('express');
const userRoutes = express.Router();

// Require user model in our routes module
let User = require('./data.model');

// Defined store route
userRoutes.route('/add').post(function (req, res) {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({'user': 'user in added successfully'});
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
userRoutes.route('/').get(function (req, res) {
    User.find(function(err, useres){
    if(err){
      console.log(err);
    }
    else {
      res.json(useres);
    }
  });
});

// Defined edit route
userRoutes.route('/:usename').get(function (req, res) {
  let id = req.params.username;
  User.find(function(err, users){
    res.json(users.find(id));
  });
  User.findById(id, function (err, user){
      res.json(user);
  });
});

//  Defined update route
userRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
    if (!user)
      res.status(404).send("data is not found");
    else {
        user.person_name = req.body.person_name;
        user.user_name = req.body.user_name;
        user.user_gst_number = req.body.user_gst_number;

        user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').get(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = userRoutes;
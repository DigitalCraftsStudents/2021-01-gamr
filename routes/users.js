var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.User.findAll()
    .then(users => {
      res.json(users)
    })
});

router.post('/', (req, res) => {
  // create a user in the database
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    gamerTag: req.body.gamerTag,
  })
    .then(user => {
      // if successful, respond with error
      res.json(user);
    })
    .catch(error => {
      // if failed, return the error messages
      if (error.errors) {
        // try to get errors from sequelize
        res.json(error.errors.map(e => e.message))
      } else {
        // send back generic error otherwise
        res.json({error: 'failed to create user'})
      }
    })
})

module.exports = router;

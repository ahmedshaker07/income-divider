const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.findOne({username: "ahmed"})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const spentThisMonth = req.body.spentThisMonth;
  const spentLastMonth = req.body.spentLastMonth;

  const newUser = new User({ username, spentThisMonth, spentLastMonth });
  newUser.save()
    .then(res.status(200).send())
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/').put((req, res) => {
  User.findOneAndUpdate({"username": "ahmed"},
  { $set: { "spentThisMonth" : 0, "spentLastMonth" : req.body.newSpent,
  "availableMonthlyBalance": req.body.newAvailable}})
  .then(res.json("Updated"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/spentThisMonth').put((req, res) => {
  User.findOneAndUpdate({"username": "ahmed"},
  { $inc: { "spentThisMonth" : req.body.spent, "availableMonthlyBalance" : -req.body.spent}})
  .then(res.json("Updated"))
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
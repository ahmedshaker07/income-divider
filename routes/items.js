const router = require('express').Router();
let Item = require('../models/item.model');

router.route('/').get((req, res) => {
    Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const describtion = req.body.describtion;
  const value = req.body.value;
  const date = Date.now();

  const newItem = new Item({ describtion, value, date });
  newItem.save()
    .then(res.status(200).send())
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/').delete((req, res) => {
  const id = req.body.id
  Item.findByIdAndDelete(id)
    .then(res.status(200).send("Deleted"))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;
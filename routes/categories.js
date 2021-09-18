const router = require('express').Router();
let Category = require('../models/category.model');

router.route('/').get((req, res) => {
  Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
  const id = req.body.id
  Category.findByIdAndDelete(id)
    .then(res.status(200).send("Deleted"))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const name = req.body.name;
  const value = req.body.value;
  const amount = req.body.amount;

  const newCategory = new Category({ name, value, amount });
  newCategory.save()
    .then(res.status(200).send())
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/assign').put((req, res) => {
  const income = req.body.income;
  Category.find().then(categories => {
    categories.forEach((category) => {
      Category.findByIdAndUpdate(
        category._id,
        { "amount": category.amount + income * (category.value / 100) }
      ).then()
    })
  })
    .then(res.status(200).send("Updated"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deduct').put((req, res) => {
  const category = req.body.category;
  const deductionValue = req.body.deductionValue;

  Category.findOneAndUpdate({ name: category }, { $inc: { "amount": deductionValue * -1 } })
    .then(res.status(200).send("Deducted"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addValue').put((req, res) => {
  const category = req.body.category;
  const addedValue = req.body.addedValue;

  Category.findOneAndUpdate({ name: category }, { $inc: { "amount": addedValue } })
    .then(res.status(200).send("Added"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/reset').put((req, res) => {
  Category.updateMany({ $set: { amount: 0 } })
    .then(res.status(200).send("Reset"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit').put((req, res) => {
  const id = req.body.id
  const name = req.body.name
  const value = req.body.value
  const amount = req.body.amount

  Category.findByIdAndUpdate(id, { value: value, name: name, amount: amount })
    .then(res.status(200).send("Edited"))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
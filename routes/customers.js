const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required:  true,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: String,
    required:  true,
    minlength: 10,
    maxlength: 20
  },
  isGold : {
      type: Boolean
  }
}));

router.get('/', async (req, res) => {

    let customers = await Customer.find().sort('phone')
    res.send(customers)

})

router.post('/', async (req, res) => {
    const {error} = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let customer = new Customer ({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();

    res.send(customer)

})

router.put('/:id', async (req, res) => {
    
})

router.delete('/:id', async (req, res) => {

})

function validateCustomer(customer) {
    schema = {
        name: Joi.string().max(50),
        phone: Joi.string().min(10).max(20),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}

module.exports = router;
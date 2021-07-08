const express = require('express');
const petRouter = express.Router();
const User = require('../models/user');
const Pet = require('../models/pet');


//index
petRouter.get('/', async (req, res) => {
  const pets = await Pet.find({});
  res.json({ pets });
});


//delete
petRouter.delete('/:id', async (req, res) => {
  const deletedPet = await Pet.findByIdAndRemove(req.params.id);
  if (deletedPet) {
    res.json({ success: true });
  }
});

//update
petRouter.put('/:id', async (req, res) => {
  await Pet.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'successfully updated' });
});

//create
petRouter.post('/', async (req, res) => {

  const pet = await Pet.create(req.body);
  res.json({ pet });

});



//show
petRouter.get('/:id', async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  const user = await User.findById(pet.createdBy);
  res.json({ pet, user });
});

module.exports = petRouter;
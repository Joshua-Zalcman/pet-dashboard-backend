const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Pet = require('../models/pet');

const verifyToken = require('../middleware/verfiyToken');


//index
//only admin can see this
userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json({ users });
});

//login

userRouter.post('/login', async (req, res) => {

  if (req.body.password) {

    const user = await User.findOne({
      email: req.body.email
    });
    if (!user) {
      res.json({ message: "No user with that email address has been registered" });
    } else {
      const passwordMatches = bcrypt.compareSync(req.body.password, user.password);

      if (passwordMatches) {
        console.log('passwords matched');
        jwt.sign({ user }, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
          res.json({ token, message: 'successful login' });
        });

      } else {
        console.log('passwords did not match');
        res.json({ message: 'invalid password' });
      }
    }

  } else {
    res.json('enter password');
  }

});

//delete
//route for deleting user (only acessbile to admin or user deleting their own account)
userRouter.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndRemove(req.params.id);
  if (deletedUser) {
    res.json({ success: true });
  }
});

//update
//update user info (only accessible to user updating their own info)
userRouter.put('/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'successfully updated' });
});

//create
//register new user post request- valid email and password required for this - jwt token created
userRouter.post('/', async (req, res) => {
  //checks will be done in react for valid user data
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  const user = await User.create(req.body);
  res.json({ user });

});
//show
userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  const pets = await Pet.find({ createdBy: req.params.id });
  res.json({ user, pets });
});

module.exports = userRouter;
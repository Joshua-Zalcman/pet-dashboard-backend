//Dependencies
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const seed = require('./models/seeder');
const petSeed = require('./models/petseeder');
const User = require('./models/user');
const Pet = require('./models/pet');
const favicon = require('serve-favicon');

// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middleware
app.use(cors());
app.use(express.json());
const verifyToken = require('./middleware/verfiyToken');

//Routes
const petsController = require('./controllers/pets');
app.use('/pets', petsController);
const usersController = require('./controllers/users');
app.use('/users', usersController);

//seeder users
// app.get('/seed', (req, res) => {
//   User.deleteMany({}, (error, allUsers) => { });
//   seed.forEach(user => {
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
//   });
//   User.create(seed, (error, data) => {
//     console.log(' users seeded');
//   });
// });

//seeder pets
// app.get('/seedpets', async (req, res) => {
//   Pet.deleteMany({}, (error, allUsers) => { });
//   const foundUser = await User.findOne({ email: 'admin@yahoo.com' });
//   petSeed.forEach(pet => {

//     pet['createdBy'] = foundUser._id;
//     console.log(pet);
//   });
//   Pet.create(petSeed, (error, data) => {
//     console.log('pets seeded');
//   });

// });

//Listener
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

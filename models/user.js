const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user schema
const userSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phoneNumber: Number,
  city: { type: String, required: true },
  address: String,
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

//middleware
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
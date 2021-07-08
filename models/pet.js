const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//pet schema
const petSchema = Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  img: { type: String },
  age: { type: Number, required: true },
  description: { type: String, required: true },
  isHealthy: { type: Boolean, default: true },
  forAdoption: { type: Boolean, default: true },
  forFoster: { type: Boolean, default: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });



const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
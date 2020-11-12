const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
	name: { type: String, required: true },
	age: Number,
	date: { type: Date, default: Date.now() },
	registered: Boolean,
	grades: { type: Array }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

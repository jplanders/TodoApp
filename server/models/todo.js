var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
	name: String,
	startDate: String,
	endDate: String
});

module.exports = mongoose.model('Todo', todoSchema );
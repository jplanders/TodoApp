//server side controller
var Todo = require('../models/todo');

module.exports.list = function (req, res) {
	Todo.find({}, function (err, results) {
		res.json(results);
	});
}

module.exports.create = function (req, res) {
	//console.log(req.body);
	var todo = new Todo(req.body);
	todo.save(function(err, result) {
		if(err) return console.error(err);
		res.json(result);
	});
}
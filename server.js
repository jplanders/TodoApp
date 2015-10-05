var express 		= require('express'),
	app				= express(),
	bodyParser 		= require('body-parser'),
	mongoose		= require('mongoose'),
	Todo 			= require('./server/models/todo'),
	//mongojs			= require('mongojs'),
	//db	 			= mongojs('todolist',['todos']),
	taskController 	= require('./server/controllers/task-controller');

mongoose.connect('mongodb://localhost:27017/todolist');

app.use(bodyParser());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/view/index.html');
});

app.use('/js', express.static(__dirname + '/public/js'));

app.get('/api/tasklist', taskController.list);


app.post('/api/tasklist', taskController.create);

app.delete('/todolist/:id', function (req, res) {
	Todo.findByIdAndRemove(req.params.id, function(err, doc){
		if (err) console.log(err);
		res.json(doc);
	})
});

app.get('/todolist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	Todo.findById(id, function (err, doc) {
		if (err) console.log(err);
		res.json(doc);
	})
});

app.put('/todolist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.endDate);
	Todo.findByIdAndUpdate(id, { name: req.body.name, endDate: req.body.endDate }, function (err, todo) {
		if (err) console.log(err);
		todo.save(function (err, doc) {
			if (err) console.log(err);
			res.json(doc);
		});
	});
});

app.listen(3000, function() {
	console.log('The server is listening...');
})
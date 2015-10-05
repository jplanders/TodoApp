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
/*app.get('/todolist', function (req, res) {
	db.todolist.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});*/
app.post('/api/tasklist', taskController.create);
app.delete('/todolist/:id', function (req, res) {
	Todo.findByIdAndRemove(req.params.id, function(err, doc){
		if (err) console.log(err);
		res.json(doc);
	})
});

app.listen(3000, function() {
	console.log('The server is listening...');
})
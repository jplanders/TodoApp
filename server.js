var express 		= require('express'),
	app				= express(),
	bodyParser 		= require('body-parser'),
	mongoose		= require('mongoose'),
	taskController 	= require('./server/controllers/task-controller');

mongoose.connect('mongodb://localhost:27017/todolist');

app.use(bodyParser());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/view/index.html');
});

app.use('/js', express.static(__dirname + '/public/js'));

app.get('/api/tasklist', taskController.list);
app.post('/api/tasklist', taskController.create);

app.listen(3000, function() {
	console.log('The server is listening...');
})
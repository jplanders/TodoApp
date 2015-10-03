var express 		= require('express'),
	app				= express();
	bodyParser 		= require('body-parser')
	taskController 	= require('./server/controllers/task-controller')

app.use(bodyParser());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/view/index.html');
});

app.use('/js', express.static(__dirname + '/public/js'));

app.post('/api/tasklist', taskController.create);

app.listen(3000, function() {
	console.log('The server is listening...');
})
var express = require('express'),
	app		= express();

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/view/index.html');
});

app.listen(3000, function() {
	console.log('The server is listening...');
})
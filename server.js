var express = require('express'),
	app		= express();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/view/index.html');
});

app.use('/js', express.static(__dirname + '/public/js'));

app.listen(3000, function() {
	console.log('The server is listening...');
})
var express = require('express');
var app = express();
/*var http = require('http').Server(app);
var io = require('socket.io')(http);
*/
var server = app.listen(8080,function(){
	console.log('Server running');
});
var io = require('socket.io').listen(server);
app.use(express.static('public'));
app.get('/',function (req,res) {
	res.sendFile(__dirname + '/chat.html');
});
var chat = io.of('/')
io.on('connection',function(socket){
	console.log('a user');
	var messages = [];
	socket.join(chat);
	socket.on('chatSend',function(msg){
		messages.push(msg);
		socket.broadcast.to(chat).emit('chatReceive',msg)
		
		console.log(messages);
	});
	socket.on('disconnect',function(){
		console.log('user disconnect');
	});
});

/*app.listen('8080',function(){
	console.log('Server running');
});*/
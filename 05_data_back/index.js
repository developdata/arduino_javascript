var SerialPort = require('serialport');
var serialport = new SerialPort("/dev/tty.usbmodem621");

var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.engine('ejs', require('ejs').__express)
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index')
})

// Add a connect listener
io.on('connection', function(client){ 
    console.log('Connection to client established');

    // Success!  Now listen to messages to be received
    client.on('message',function(event){ 
        console.log('Received message from client!',event);
    serialport.write(event + 'T');

    });

    client.on('disconnect',function(){
        // clearInterval(interval);
        console.log('Server has disconnected');
    });
});

server.listen(3000, function() {
  console.log('Listening on port 3000...')
})
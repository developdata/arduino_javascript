var SerialPort = require('serialport');
// var serialport = new SerialPort("/dev/tty.usbmodem621");

var serialport = new SerialPort("/dev/tty.usbmodem621", {
  baudRate: 9600
});

var http = require('http')
  , express = require('express')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io')(server)

app.engine('ejs', require('ejs').__express)
app.set('view engine', 'ejs');

serialport.on('open', function(){
  console.log('Serial Port Opened');
  
});

// serialport.on('data', function(data){
//    console.log(data[0]);
// });


app.get('/', function (req, res) {
  res.render('index')
})

var count = 0;

io.on('connection', function (socket) {

  console.log('connected')

  var data;
  serialport.on('data', function(datastuff){
    count +=1
    data = datastuff[0];
    count++

    io.emit('newdata', { msg: 'One more person is online', count: data })
    socket.emit('private', { msg: 'Welcome you are the ' + count + ' person here' })

  });

  socket.on('private', function (data) {
    console.log(data);
  })

  socket.on('disconnect', function() {
    count--
    console.log('disconnected')
    io.emit('news', { msg: 'Someone went home', count: count })
  })
})

server.listen(3000, function() {
  console.log('Listening on port 3000...')
})
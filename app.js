var express = require('express');
var app = express();
var exec = require('child_process').exec;
var util = require('util');
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.Port || 3000;


var ls = exec('systemctl is-active publicmc-server', (error, stdout, stderr) => {
   if(error) {
     // エラー時は標準エラー出力を表示して終了
     return stderr;
   }
   else {
     // 成功時は標準出力を表示して終了
     return stdout;
   }
 });

// io.emit('message_s', util.inspect(ls));

// console.log(ls);


// app.get('/', function (req, res) {
//    // res.send('るしあんワールド');
//    // res.sendFile(__dirname);
//    res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function (socket) {
   socket.on('message', function(msg){
      // console.log('message: ' + msg);
      io.emit('message_s', msg);
      // io.emit('message_s', util.inspect(ls));
      // io.emit('message_s', ls);
      // io.emit('message_s', "マレー語");
   });
});

http.listen(PORT, function () {
   console.log('server listening. Port:' + PORT);

});
// var express = require('express');
// var app = express();
var exec = require('child_process').exec;
// var util = require('util');
// var http = require('http').Server(app);
// var fs = require('fs');

// const io = require('socket.io')(http);
// const PORT = process.env.Port || 3000;
// setInterval(function() {


//ファイルの書き込み関数
// function writeFile(path, data) {
//   fs.writeFile(path, data, function (err) {
//     if (err) {
//       throw err;
//     }
//   });
// }

// //使用例
// writeFile("test.txt", "サンプルテキスト");



// io.on('connection', function (socket) {
//   var text = fs.readFileSync("test.txt").toString();
//   io.emit('message_s', text);
//   socket.on('message', function (msg) {
//     io.emit('message_s', msg);
//     // io.emit('message_s', util.inspect(ls));

//   });
// });

// http.listen(PORT, function () {
//   console.log('server listening. Port:' + PORT);

// });






var port = 4001


var listen_check = new Promise(function (resolve) {
	exec('netstat -anu | grep ' + port, (err, stdout, stderr) => {
		if (!err) resolve(true)
		else resolve(false)
	});
})


listen_check.then(function (data) {

	return data
});

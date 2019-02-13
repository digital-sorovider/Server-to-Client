// var express = require('express');
// var app = express();
var exec = require('child_process').exec; //シェルコマンド実行モジュール
// var util = require('util');
// var http = require('http').Server(app);
// var fs = require('fs');

// const io = require('socket.io')(http);
// const PORT = process.env.Port || 3000;


var status;

var port = 4000

function listen() {

	//指定されたポートがlistenされているかどうか判定
	var result = new Promise(function (resolve) {
		exec('netstat -anu | grep ' + port, (err) => {
			if (!err) resolve(true)
			else resolve(false)
		});
	})

	//（上記の判定が終了した後）前回の判定と今回の判定結果が違う場合はサーバーのステータスが変化したことをクライアントに知らせる
	result.then(function (data) {
		if(status !== data)
		console.log(data)
		status = data
	});

}

//1秒ごとに判定
setInterval(listen, 1000)

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

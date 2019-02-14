var express = require('express');
var app = express();
var exec = require('child_process').exec; //シェルコマンド実行モジュール
const is_windows = process.platform === 'win32'
const is_linux = process.platform === 'linux'
// var util = require('util');
var http = require('http').Server(app);
// var fs = require('fs');

const io = require('socket.io')(http);
const PORT = process.env.Port || 3000;


var status;

check_port = "4000"
port = '":' + check_port + ' "'

function listen_check() {
	// var search_type;

	//実行OSを基にnetstatとコマンドのオプションと検索コマンドの分岐
	if (is_windows) {
		args = ' -anp UDP '
		search_type = ' find '
	}

	if (is_linux) {
		args = ' -anu '
		search_type = ' grep '
	}


	//指定されたポートがlistenされているかどうか判定
	var result = new Promise(function (resolve) {
		exec('netstat' + args + '|' + search_type + port, (err, stdout) => {
			if (!err) resolve(true)
			else resolve(false)
		});
	})

	//（上記の判定が終了した後）前回の判定と今回の判定結果が違う場合はサーバーのステータスが変化したことをクライアントに知らせる
	result.then(function (data) {
		// io.emit('message_s', true);
		// if (data) {
		// 	io.emit('server_status', "Running!!");
		// }
		// else{
		// 	io.emit('server_status', "Not Run!");

		// }

		if (status !== data) {
			// console.log(data)

			if (data) {
				io.emit('message_s', "サーバーが稼働状態になりました");
				io.emit('server_status', "Running!!");

			}
			else {
				io.emit('message_s', "サーバーが停止状態になりました");
				io.emit('server_status', "Not Run!");

			}
			status = data
		}
	});


}

//1秒ごとに判定
// setInterval(listen_check, 1000)

io.on('connection', function (socket) {
	// listen_check()
	console.log("connect");

	if (status) {
		io.emit('server_status', "Running!!");
	}
	else {
		io.emit('server_status', "Not Run!");
	}

	//   var text = fs.readFileSync("test.txt").toString();
	//   io.emit('message_s', text);
	socket.on('message', function (msg) {
		io.emit('message_s', msg);
		// io.emit('message_s', util.inspect(ls));

	});
});

http.listen(PORT, function () {
	console.log('server listening. Port:' + PORT);

});

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

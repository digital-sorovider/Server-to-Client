
var config = require('./config.js')
var express = require('express');
var app = express();
var exec = require('child_process').exec;
var http = require('http').Server(app);
const io = require('socket.io')(http);
var http_port = 3000;
var is_windows = process.platform === 'win32'
var is_linux = process.platform === 'linux'
var status;
var check_port = config.port
var pro = config.protocol
var locationx;
var locationy;


if (!Number.isNaN(Number(process.argv[2]))) {
	check_port = process.argv[2]
}
else if (process.argv[2]) {
	console.log("ポート番号は数値を入力してください");
	return
}
port = '":' + check_port + ' "'


if (process.argv[3]) {
	pro_arg = process.argv[3].toUpperCase()

	if (pro_arg === 'TCP' || pro_arg === 'UDP') {
		pro = pro_arg
	}
	else if (pro_arg) {
		console.log("プロトコルはTCP又はUDPを指定してください")
		return
	}
}




app.get('/', function (req, res) { res.sendFile(__dirname + '/index.html'); });
app.get('/jquery', function (req, res) { res.sendFile(__dirname + '/js/jquery-1.11.1.js'); });


//サーバーが起動しているかをポートのlisten状態で判断し、結果をクライアントにプッシュする
function listen_check() {
	port = '":' + check_port + ' "'
	//実行OSを基にnetstatとコマンドのオプションと検索コマンドの分岐
	if (is_windows) {
		args = ' -anp ' + pro + ' '
		search_type = ' find '
	}

	if (is_linux) {
		search_type = ' grep '
		if (pro === 'TCP') args = ' -ant '
		else args = ' -anu '

	}

	//指定されたポートがlistenされているかどうか判定
	var result = new Promise(function (resolve) {
		exec('netstat' + args + '|' + search_type + port, (err, stdout) => {
			if (!err) resolve(true)
			else resolve(false)
		});
	})

	//（ポートのlisten確認後）前回の判定結果と今回の判定結果が違う場合はサーバーのステータスが変化したことをクライアントに知らせる
	result.then(function (data) {

		if (status !== data) {
			if (data) {
				io.emit('message_s', "サーバーが稼働状態になっています");
				io.emit('server_status', "稼働中(listen)", 'lightgreen');
			}
			else {
				io.emit('message_s', "サーバーが停止状態になっています");
				io.emit('server_status', "停止中(not listen)", 'red');

			}
			status = data
		}
	});


}

//0.5秒ごとに判定
setInterval(listen_check, 500)

//クライアント接続時の処理
io.on('connection', function (socket) {
	console.log("client connect");
	io.emit('protocol', pro);
	io.emit('port', check_port);
	io.emit('def_location', locationx, locationy);


	//現在のサーバーステータスをプッシュ
	listen_check()
	if (status) io.emit('server_status', "稼働中", 'lightgreen');
	else io.emit('server_status', "停止中", 'red');

	socket.on('port_c', function (port_num) {
		check_port = port_num
		if (!Number.isNaN(Number(port_num))) {
			io.emit('port', port_num);
		}
		else {
			io.emit('port', "");

		}
	})

	socket.on('protocol_c', function (protocol) {
		pro = protocol
		io.emit('protocol', pro);
	})

	socket.on('location', function (x, y){
		io.emit('location_c', x, y)
		locationx = x
		locationy = y
	})

});

http.listen(http_port, function () {
	console.log('http Server Port:' + http_port + '(TCP)')
	console.log("\nchecking port:" + check_port + '(' + pro + ')')
});



const NetcatServer = require('netcat/server')
const NetcatClient = require('netcat/client')
// var express = require('express');
var nc = require('node-netcat');
// var nc = new NetcatClient()
// var app = express();
// var exec = require('child_process').exec;
// var util = require('util');
// var http = require('http').Server(app);
// var fs = require('fs');
const nmap = require('libnmap');
var lsof = require('lsof');
var portscanner = require('portscanner')
// const io = require('socket.io')(http);
// const PORT = process.env.Port || 3000;
// setInterval(function() {

// var port = '4001';

// nc.addr('192.168.0.3').scan(port+'-'+port, function(ports){
//   // ports: { '22': 'open', '23': 'closed' ... }
//   console.log(ports[port]);
//  })
// }, 500);


// nc.udp().port(9987).wait(1000).init().send('hello', '192.168.0.3')

// var ls = exec('ls', (error, stdout, stderr) => {
//    if(error) {
//      // エラー時は標準エラー出力を表示して終了
//      return stderr;
//    }
//    else {
//      // 成功時は標準出力を表示して終了
//      return stdout;
//    }
//  });

// const opts = {
//   range: ['192.168.0.3']

// };

// function portscan(opts) {
//   console.log("はららけええ");

//   nmap.scan(opts, function (err, report) {
//     console.log("スキャン開始");
//     if (err) console.log("エラー");

//     // if (err) throw new Error(err);
//     for (let item in report) {
//       console.log("正常");
//       console.log(JSON.stringify(report[item]));
//     }
//   });
// }

// portscan(opts);

// console.log(nc.Server(25565, "192.168.0.3"));

// var scan = nc.portscan();

// scan.run('192.168.0.3', '25565', function (err,res){
//   console.log(err,res);

// });

// new nc.client(25565, '192.168.0.3');

// client.start();
// var udp = nc.udpServer('9987', '192.168.0.3')
// console.log(udp);


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

// const opts = {
//   range : ['192.168.0.3'],
//   // range : ['192.168.0.3','192.168.0.3'],

//   ports : '4000'
// };

// nmap.scan(opts, function(err, report) {
//   if (err) throw new Error(err);
//   // console.log("open");
//   for (let item in report) {
//     // console.log(report[item]['host']['item']);
//     console.log(JSON.stringify(report[item]['host']));
//     // console.log(JSON.stringify(report[item]));
//     // console.log(item);

//   }
// });

// portscanner.checkPortStatus(4001, '192.168.0.3', function(error, status) {
//   // Status is 'open' if currently in use or 'closed' if available
//   console.log(status)
// })

// nc.udp().port(9987).wait(1000).init().send('hello', '192.168.0.3')

// nc.addr('192.168.0.3').scan('4000-4001', function(ports){
//   // ports: { '22': 'open', '23': 'closed' ... }
//   console.log(ports);

//  })
// nc.client('25568', '192.168.0.3');
// var client = nc.udpClient('4001', '192.168.0.3');

// client.on('open', function () {  console.log('open'); });

// client.once('error', function (err) {  console.error('err'); });

// client.once('close', function () { console.log('client, closed'); });

// client.send('Hello World');
// new nc.udpClient('4001', '192.168.0.3');

var scan = nc.portscan();

scan.run('192.168.0.3', '4000-4001', function (err, res) {
	console.log(err, res);
});
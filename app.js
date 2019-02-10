var express = require('express');
var nc = require('node-netcat');
var app = express();
// var exec = require('child_process').exec;
// var util = require('util');
var http = require('http').Server(app);
var fs = require('fs');
const nmap = require('libnmap');
const io = require('socket.io')(http);
const PORT = process.env.Port || 3000;

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
var udp = nc.udpServer('9987', '192.168.0.3')
console.log(udp);


//ファイルの書き込み関数
function writeFile(path, data) {
  fs.writeFile(path, data, function (err) {
    if (err) {
      throw err;
    }
  });
}

//使用例
writeFile("test.txt", "サンプルテキスト");



io.on('connection', function (socket) {
  var text = fs.readFileSync("test.txt").toString();
  io.emit('message_s', text);
  socket.on('message', function (msg) {
    io.emit('message_s', msg);
    // io.emit('message_s', util.inspect(ls));

  });
});

http.listen(PORT, function () {
  console.log('server listening. Port:' + PORT);

});
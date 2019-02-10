var express = require('express');
var app  = express();
var exec = require('child_process').exec;
var util = require('util');
var http = require('http').Server(app);
var fs   = require('fs');
var nmap = require('node-libnmap')
const io = require('socket.io')(http);
const PORT = process.env.Port || 3000;

var ls = exec('ls', (error, stdout, stderr) => {
   if(error) {
     // エラー時は標準エラー出力を表示して終了
     return stderr;
   }
   else {
     // 成功時は標準出力を表示して終了
     return stdout;
   }
 });

 const opts = {
  range: [
    '192.168.0.3/24'
  ]
};

nmap.scan(opts, function(err, report) {
  if (err) throw new Error(err);

  for (let item in report) {
    console.log(JSON.stringify(report[item]));
  }
});

//ファイルの書き込み関数
function writeFile(path, data) {
  fs.writeFile(path, data, function (err) {
    if (err) {
        throw err;
    }
  });
}

//使用例
writeFile("test.txt", "これで読み込めてるってことか");



io.on('connection', function (socket) {
   var text = fs.readFileSync("test.txt").toString();
   io.emit('message_s', text);
   socket.on('message', function(msg){
      io.emit('message_s', msg);
      // io.emit('message_s', util.inspect(ls));

   });
});

http.listen(PORT, function () {
   console.log('server listening. Port:' + PORT);

});
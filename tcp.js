//テスト用の簡易TCPサーバー(指定されたポートをlistenするだけ)

var http = require('http').Server();
var server_host = 'localhost'
var server_port = 4000 //サーバーとしてlistenするポートのデフォルト値

if (!Number.isNaN(Number(process.argv[2]))) {
    server_port = process.argv[2]
}
else if (process.argv[2]) {
    console.log("ポート番号は数値を入力してください");
    return
}


setTimeout(() => { console.log("1") }, 0);
setTimeout(() => { console.log("2") }, 1000);
setTimeout(() => { console.log("3") }, 2000);

setTimeout(() => {
    http.listen(server_port, function () {
        console.log("\n" + 'Test TCP Server Start');
        console.log(server_host, ':', server_port);
    });
}, 3000);
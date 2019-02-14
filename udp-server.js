var dgram = require('dgram');

setTimeout(() => {
    console.log("1")
}, 1000);
setTimeout(() => {
    console.log("2")
}, 2000);
setTimeout(() => {
    console.log("3")
}, 3000);

setTimeout(() => {

sock = dgram.createSocket("udp4", function (msg, rinfo) {
  console.log('got message from '+ rinfo.address +':'+ rinfo.port);
  console.log('data len: '+ rinfo.size + " data: "+
              msg.toString('ascii', 0, rinfo.size));
});
sock.bind(4000, 'localhost');
}, 4000);
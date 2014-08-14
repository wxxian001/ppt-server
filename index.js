/*
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
*/

var app = require( 'koa' )();
var _ = require('koa-route');
var fs = require('fs');
var views = require('koa-views');
var send = require('koa-send');

var service = require('./service/service.js');



/**
 * Setup views.
 */

app.use(views({
  cache: true,
  map: {
    html: 'underscore'
  }
}));


app.use(_.get('/',function *(){
    var data = yield service.getData();
    //console.log(data);
    yield this.render('index',{it:data});
}));

app.use(function *(){
  yield send(this, this.path, { root: __dirname + '/public' });
});



var http= require( 'http' ).Server( app.callback() );
var io = require('socket.io')(http); // this has changed

/*
app.get('/', function(req, res){
  res.sendfile('index.html');
});
*/


io.on('connection', function(socket){
  socket.on('control', function(msg){
      var address = this.handshake.address.address;
      //console.log(address);
      if(address === '127.0.0.1' || address === 'localhost'){
          io.emit('control', msg);
      }
  });
});

http.listen(3000);

console.log('listening on *:3000');



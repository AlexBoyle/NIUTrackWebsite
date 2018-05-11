var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('./sqlService.js');
console.log('Starting Service')
var app = express();
app.use(express.static('publicFiles'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));


var parseReq = function(req) {
  output = [];
  output['ip'] = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  output['cookies'] = req.cookies;
  output['var'] = req.body;
};
var authUser = function(hash, ip) {
  var result = mysql.query('SELECT user_id FROM instance WHERE hash="' + hash + '" and ip="' + ip + '";');
  return result;
  
}
authUser("a", "67.202.34.24");
///////////////////////////////////////////////////////////////////////////////


var application = function(req, res){
    var host = req.headers.host;
    var protocol = 'http' + (req.connection.encrypted ? 's' : '') + '://';
    //var sub = host ? host.substring(0,host.indexOf('.')) : undefined;
    //sub == 'alexboyle' ? sub = undefined : '';
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //console.log(ip + "     " + sub +  "     " + req.originalUrl);
    res.sendFile(path.resolve('publicFiles/html/base.html'));
};
var nothing = function(req, res){
  res.send(JSON.stringify({ a: 1 }));
};
var getUserInfo = function(req, res) {
   res.send(JSON.stringify([authUser('hash', '172.0.0.1')]));
}
//get user information
app.route('/api/user').get(getUserInfo);
//login
app.route('/api/user/login').post(nothing);
//create new user
app.route('/api/user/create').post(nothing);
app.route('/api/schedule').get(nothing);
app.route('/api/schedule').post(nothing);
app.route('/api/schedule/workout').get(nothing);
app.route('/api/schedule/workout').post(nothing);
app.route('/api/schedule/').post(nothing);
app.route('/api/coaches').get(nothing);
app.route('/api/coaches').post(nothing);
app.route('/*').get(application);
app.listen(80, function () {
  console.log('app launched on port: 80')
})

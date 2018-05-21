console.log('Starting Service');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var route = require('./routeService.js');
var mysql = require('./sqlService.js');
var app = express();
app.use(express.static('publicFiles'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
mysql.setup()
app.route('/api/user').get(route.userGet);
app.route('/api/user/login').post(route.userLogin);
app.route('/api/user/logout').get(route.userLogout);
app.route('/api/user/auth').post(route.userAuth);
// Launch app after setup
app.route('/*').get(function(req, res){res.sendFile(path.resolve('publicFiles/html/base.html'))});
app.listen(80, function () {
	console.log('app launched on port: 80')
})

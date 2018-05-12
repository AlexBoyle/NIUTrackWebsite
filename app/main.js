console.log('Starting Service');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('./sqlService.js');
var app = express();
app.use(express.static('publicFiles'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));

/* Below is an api example (will remove when ofloaded into a new file)
var resolve = function(res){return function(val){res.send(JSON.stringify(val))}};
var getUser = function(id, resolve) {mysql.query('SELECT username, fname, lname FROM users WHERE id=?;', [id], resolve);}
app.route('/api/user').get(getUser(function(req, res){req.query.id, resolve(res))});
*/


// Launch app after setup
app.route('/*').get(function(req, res){res.sendFile(path.resolve('publicFiles/html/base.html'))});
app.listen(80, function () {
	console.log('app launched on port: 80')
})

(function() {
	var mysql = require('./sqlService.js');
	var sha256 = require('sha256');
	var cookieParser = require('cookie-parser')
	
	module.exports.userLogin = function(req, res){
		mysql.query('SELECT id, fname, lname FROM users WHERE username=? AND password=?;', [req.body.user, sha256.x2(req.body.pass)])
		.then(
			function(result){
				if(result[0]) {
					setHash(res, result[0], req.headers['x-forwarded-for'] || req.connection.remoteAddress)
				}
				else {
					res.send(JSON.stringify({auth: false}))
				}
			},
			function(err){
				res.send(JSON.stringify(err))
			}
		)
	}
	module.exports.userLogout = function(req, res) {
		res.cookie('Auth', '').send(JSON.stringify({auth: false}));
	}
	module.exports.userGet = function(req, res) {
		mysql.query('SELECT id, username, fname, lname FROM users WHERE id=?;', [req.query.id])
		.then(function(result){
			res.send(JSON.stringify(result))
		});
	}
	var setHash = function(res, user, ip) {
		var time = Math.floor(+ new Date()/1000);
		var hash = sha256.x2(user.fname + time + user.lname + "TrackBoi");
		mysql.query('INSERT INTO instance (userID, hash, ip, time) VALUE (?, ?, ?, ?);', [user.id, hash, ip, time]).then(function(){}, function(err){console.log(err)});
		res.cookie('Auth', hash).send(JSON.stringify({auth: true}));
	}
	module.exports.userAuth = function(req, res) {
		mysql.query('SELECT id from instance WHERE hash=? and ip=?', [req.cookies.Auth, req.headers['x-forwarded-for'] || req.connection.remoteAddress])
		.then(
			function(re){
				if(re[0]) {
					res.send(JSON.stringify({auth: true, uid: re[0].id}))
				}
				else {
					res.send(JSON.stringify({auth: false}))
				}
			},
			function(er){res.send(JSON.stringify({auth: false}))}
		)
	}
}());
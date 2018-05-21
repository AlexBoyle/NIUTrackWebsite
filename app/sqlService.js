(function() {
	var mysql = require('mysql');
	var sha256 = require('sha256');
	var pool = mysql.createPool({
		connectionLimit : 50,
		host: 'mysql',
		user: 'root',
		password: 'password',
		database : 'NIUTrack'
	});

	var query = module.exports.query = function(query, params) {
		return new Promise((resolve, reject) => {
			pool.getConnection(function (err, con) {
				con.query(query, params, function(err, res, fields){
					if(!err){
						resolve(res);
					}
					reject(err);
				});
			});
		});
	};
	module.exports.setup = function(){
		query(`
			CREATE TABLE IF NOT EXISTS users (
				id INT NOT NULL AUTO_INCREMENT,
				username VARCHAR(32) NOT NULL DEFAULT '',
				fname VARCHAR(32) NOT NULL DEFAULT '',
				Lname VARCHAR(32) NOT NULL DEFAULT '',
				password VARCHAR(264) NOT NULL,
				enabled BOOLEAN NOT NULL DEFAULT TRUE,
				PRIMARY KEY (id)
			);
		`,null)
		.then(
			function(){},
			function(err){
				console.log(err)
			}
		);
		query(`
		CREATE TABLE IF NOT EXISTS instance (
			id INT NOT NULL AUTO_INCREMENT,
			userID INT NOT NULL,
			hash VARCHAR(264) NOT NULL,
			ip VARCHAR(32) NOT NULL DEFAULT '',
			time INT(11) NOT NULL,
			PRIMARY KEY (id)
		);
		`,null)
		.then(
			function(){},
			function(er){
				console.log(er)
			}
		);
	}
}());
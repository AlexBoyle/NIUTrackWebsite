(function() {
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'password',
    database : 'NIUTrack'
  });
  con.connect(function(err) {
    if (err) {
      console.log('Failed to connect')
    }
    else {
    console.log("Connected!");
    }
  });
  module.exports.query = function(query, params) {
    con.query(query, function (err, result) {
      if (err) {
        console.log(err);
      }
      return result;
    });
  };
  module.exports.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL DEFAULT '',
    fname VARCHAR(32) NOT NULL DEFAULT '',
    Lname VARCHAR(32) NOT NULL DEFAULT '',
    password VARCHAR(264) NOT NULL,
    admin TINYINT NOT NULL DEFAULT 0,
    deactive BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
  );
  `,null);
  module.exports.query(`
  CREATE TABLE IF NOT EXISTS instance (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    hash VARCHAR(264) NOT NULL,
    ip VARCHAR(32) NOT NULL DEFAULT '',
     FOREIGN KEY (user_id) REFERENCES users(id),
     PRIMARY KEY (id)
  );
  `,null);
  module.exports.query(`
  CREATE TABLE IF NOT EXISTS workout_type
  (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
  );
  `,null);
  module.exports.query(`
  CREATE TABLE IF NOT EXISTS workouts
  (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(256) NOT NULL,
    type_id int NOT NULL DEFAULT 0, 
    description VARCHAR(512) NOT NULL DEFAULT '',
    created_by INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (type_id) REFERENCES workout_type(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
  );
  `,null);
  module.exports.query(`
  CREATE TABLE IF NOT EXISTS schedule
  (
    id INT NOT NULL AUTO_INCREMENT,
    day DATE NOT NULL,
    sprint_id INT,
    distance_id INT,
    notes VARCHAR(512) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    FOREIGN KEY (sprint_id) REFERENCES workouts(id),
    FOREIGN KEY (distance_id) REFERENCES workouts(id)
  );
  `,null);
  module.exports.query(`
  CREATE TABLE IF NOT EXISTS coaches (
    id INT NOT NULL AUTO_INCREMENT,
    fname VARCHAR(32) NOT NULL DEFAULT '',
    Lname VARCHAR(32) NOT NULL DEFAULT '',
    title VARCHAR(32) NOT NULL DEFAULT '',
    image VARCHAR(32) NOT NULL DEFAULT '',
    created_by INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (created_by) REFERENCES users(id)
  );
  `,null);
}());
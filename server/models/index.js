
const mysql = require('mysql');
const config = require("../../config");

// hash password
const md5 = require('md5');

var db_config = {
      host: config.db_config.host,
      user: config.db_config.user,
      password: config.db_config.password,
      database: config.db_config.database,
      charset : 'utf8mb4'
  };

  var connection;

  function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }
    console.log("connect!");

      //api test(gett all posts)
    exports.getUsers = (cb) => {
        var sql = "SELECT * FROM users";
        connection.query(sql, (err, result, fields) => {
          cb(err, result);
        });
    };

      // Login
    exports.login = (req, cb) => {
        var sql = `SELECT id, first_name, last_name, avatar, email FROM users WHERE email='${req.email}' AND password='${md5(req.password)}' AND status='1'`;
        connection.query(sql, (err, result, fields) => {
          cb(err, result);
        });
    };

      // Registration
    exports.registration = (req, cb) => {
        req['password'] = md5(req['password']);
        let keys = Object.keys(req);
        let values = Object.values(req);
        values = values.join("','")
        let sql = `INSERT INTO users (${keys.join(',')}) values('${values}') `
        connection.query(sql, (err, result, fields) => {
          cb(err, result);
        });
    };

      // ADMIN
      // Admin login
    exports.adminLogin = (req, cb) => {
        let sql = `SELECT id, first_name, last_name, email FROM admin WHERE email='${req.email}' AND password='${md5(req.password)}'`;
        connection.query(sql, (err, result, fields) => {
          cb(err, result);
        });
    };

      // Admin update user
    exports.adminUpdate = (id, req, cb) => {
        let sql = `UPDATE users set last_name = "${req.last_name}", first_name = "${req.first_name}",
                   email = '${req.email}', password = '${md5(req.password)}', status = '${req.status}' WHERE id = '${id}'`;
        connection.query(sql, (err, result, fields) => {
          cb(err, result);
        });
    };

      // Get Current User(by id)
    exports.getCurrentUser = (id, cb) => {
        var sql = `SELECT id, first_name, last_name, email, avatar, status FROM users WHERE id='${id}'`;
        connection.query(sql, (err, result, fields) => {
          cb(err, result);
        });
    };

      // Delete user
    exports.deleteUser = (id, cb) => {
        var sql = `DELETE FROM users WHERE id='${id}'`;
        connection.query(sql, (err, result, fields) => {
          cb(err, result);
        });
    };

    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  })  
}

  handleDisconnect();
var models = require('../models/index');
var jwt = require('jsonwebtoken'); // json web token

// Login
exports.login = (req, res) => {
	models.login(req.body, (error, response) => {
		if (error == true) {
            res.status(500).json(response);
        }else{
            const token = jwt.sign({ user: response }, 'privatekey', { expiresIn: '23h' });
            response["0"].token = token;
            response["0"].access_token = 'Bearer ';
            res.status(200).json(response);
        }
	})
}

// Registration
exports.registration = (req, res) => {
	models.registration(req.body, (error, response) => {
		if (error == true) {
            res.status(500).json(response);
        }else{
            res.status(200).json(response);
        }
	})
}

// ADMIN
// Admin login
exports.adminLogin = (req, res) => {
    models.adminLogin(req.body, (error, response) => {
        if (error == true) {
            res.status(500).json(response);
        }else{
            const token = jwt.sign({ user: response }, 'admin_privatekey', { expiresIn: '23h' });
            response["0"].token = token;
            response["0"].access_token = 'Bearer ';
            res.status(200).json(response);
        }
    })
}

//Admin Get all users
exports.getUsers = (req, res) => {
    const verify_token = verifyToken(req.token, 'admin_privatekey', res);
    if(verify_token) {
        models.getUsers((error, response) => {
            if (error == true) {
                res.status(500).json(response);
            }else{
                res.status(200).json(response);
            }
        })
    } else {
        res.sendStatus(403);
    }   
}

//Admin update user
exports.adminUpdate = (req, res) => {
    models.adminUpdate(req.params.id, req.body, (error, response) => {
        if (error == true) {
            res.status(500).json(response);
        }else{
            res.status(200).json(response);
        }
    })
}

//Admin Get Current User(by id)
exports.getCurrentUser = (req, res) => {
    const verify_token = verifyToken(req.token, 'admin_privatekey', res);
    if(verify_token) {
        models.getCurrentUser(req.params.id, (error, response) => {
            if (error == true) {
                res.status(500).json(response);
            }else{
                res.status(200).json(response);
            }
        })
    } else {
        res.sendStatus(403);
    }  
}

//Admin Delete user
exports.deleteUser = (req, res) => {
        const verify_token = verifyToken(req.token, 'admin_privatekey', res);
        if(verify_token) {
            models.deleteUser(req.params.id, (error, response) => {
                if (error == true) {
                    res.status(500).json(response);
                }else{
                    res.status(200).json(response);
                }
            })
        } else {
            res.sendStatus(403);
        }
}

// Admin Create user
exports.registrationUser = (req, res) => {
        const verify_token = verifyToken(req.token, 'admin_privatekey', res);
        if(verify_token) {
            models.registration(req.body, (error, response) => {
                if (error == true) {
                    res.status(500).json(response);
                }else{
                    res.status(200).json(response);
                }
            })
        } else {
            res.sendStatus(403);
        }
}

// Verify token
function verifyToken(token, secret_key, res) {
    let status = false;
    jwt.verify(token, secret_key, function(err, data) {
        if (err) {
          status = false;
        } else {
          status = true;
        }
    });
    return status;
}
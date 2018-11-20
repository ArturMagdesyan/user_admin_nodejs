const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controllers');

router.get('/test', function(req, res)  {
  res.send('api works');
});

// Login
router.post('/login', controller.login);

// Registration
router.post('/registration', controller.registration);

// get all users
router.get('/get-users', ensureToken, controller.getUsers);

// ADMIN
// Admin login
router.post('/admin-login', controller.adminLogin);

// Admin Update user
router.put('/admin-update/:id', controller.adminUpdate);

//Admin Get Current User(by id)
router.get('/get-user/:id', ensureToken, controller.getCurrentUser);

// Admin Delete user
router.delete('/delete-user/:id', ensureToken, controller.deleteUser);

// Admin Create user
router.post('/registration-user', ensureToken, controller.registrationUser);


// Ensure Token
function ensureToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
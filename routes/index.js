const router = require('express').Router();
const passport = require('passport');
const {genPassword} = require('../lib/passwordUtils');
const pool = require('../config/database');
const { isAuth, isAdmin } = require('./authMiddleware');
// const User = connection.models.User;

/**
 * -------------- POST ROUTES ----------------
 */

 // TODO
 router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }), (req, res, next) => {});

 // TODO
 router.post('/register', async (req, res, next) => {
    console.log('request body', req.body)
    const saltHash = genPassword(req.body.pwd);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    await pool.query("INSERT INTO users (username, hash, salt, admin) VALUES ($1, $2, $3, $4)", [req.body.uname, hash, salt, true])

    res.redirect('/login');
 });


 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pwd">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pwd">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
    
});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to protected route')
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('You made it to admin route')
});

// Visiting this route logs the user out
// router.get('/logout', (req, res, next) => {
//     req.logout();
//     res.redirect('/protected-route');
// });

// USE POST REQUEST IN REAL APP
router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/protected-route');
    });
  });

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;
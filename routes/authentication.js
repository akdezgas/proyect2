const express = require('express');
const passport = require('passport');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

router.get('/signup', (req, res) => {
    res.render('authentication/signup');
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup'
}));

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;

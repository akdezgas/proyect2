const express = require('express');
const passport = require('passport');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/User');


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

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err){ return next(err); }
  });
  res.render('authentication/edit');
});


router.get('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err)       { return next(err) }
    if (!user) { return next(new Error("404")) }
    return res.render('authentication/edit', {user})
  });
});

router.post('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
  const updates = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, updates, (err, user) => {
    if (err)       { return res.render('edit/:id', { user, errors: user.errors }); }
    if (!user) { return next(new Error("404")); }
    return res.redirect('/');
  });
});

router.post('/:id/edit/delete', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  User.findByIdAndRemove(id, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/');
  });

});

module.exports = router;

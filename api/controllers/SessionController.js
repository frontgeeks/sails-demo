/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
  'new': function  (req, res) {
    var oldDateObj = new Date(),
        newDateObj = new Date(oldDateObj.getTime() + 60000);
    req.session.cookie.expires = newDateObj;
    req.session.authenticated = true;
    res.view('session/new')
  },
  create: function  (req, res, next) {
    if(!req.param('email') || !req.param('password')) {
      var usernamePassError = [{name: 'usernamePassError', message: 'No valid name or pass'}]
      req.session.flash = {
        err: usernamePassError
      }
      res.redirect('/session/new');
      return;
    }

    User.findOneByEmail(req.param('email'), function foundUser (err, user) {
      if(err) return next(err);

      if(!user) {
        var noUser = [{name: 'noUser', message: 'No User'}]
        req.session.flash = {
          err: noUser
        }
        res.redirect('/session/new');
        return;
      }

      bcrypt.compare(req.param('password'), user.encryptedPassword, function  (err, valid) {
        if(err) return next(err);

        if(!valid) {
          var notValid = [{name: 'notValid', message: 'No notValid Pass'}]
          req.session.flash = {
            err: notValid
          }
          res.redirect('/session/new');
          return;
        }

        req.session.authenticated = true;
        req.session.User = user;

        res.redirect('/user/show/' + user.id)
      });
    });

  },
  destroy: function  (req, res, next) {
    req.session.destroy();

    res.redirect('/session/new');
  }
};


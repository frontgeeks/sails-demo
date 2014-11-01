/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  'new':  function  (req, res) {
    res.view();
  },
  'create': function  (req, res) {
    User.create(req.params.all(), function  (err, user) {

      if(err) {
        req.session.flash = {
          err: err
        };

        return res.redirect('/user/new');
      }

      // Log user in
      req.session.authenticated = true;
      req.session.User = user;

      res.redirect('/user/show/'+user.id);
    })
  },
  show : function  (req, res, next) {
    User.findOne(req.param('id'), function foundUser (err, user) {
      if(err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },
  index: function  (req, res, next) {
    User.find(function foundUser (err, users) {
      if(err) return next(err);

      res.view({
        users: users
      });
    });
  },
  edit : function  (req, res, next) {
    User.findOne(req.param('id'), function foundUser (err, user) {
      if(err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },
  update: function  (req, res, next) {
    User.update(req.param('id'), req.params.all(), function userUpdated (err) {
      if(err){
        return res.redirect('/user/edit'+req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'))
    })
  },
  destroy : function  (req, res, next) {
    User.findOne(req.param('id'), function foundUser (err, user) {
      if(err) return next(err);
      if (!user) return next('Not found user');

      User.destroy(req.param('id'), function userDestroyed (err) {
        if(err) return next(err);
      });
      res.redirect('/user')
    });
  }
};


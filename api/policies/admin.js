module.exports = function  (req, res, ok) {
  if(req.session.User && req.session.User.admin) {
    return ok();
  }
  else {
    var onlyAdmin = [{name: 'onlyAdmin', message: 'onlyAdmin'}]
    req.session.flash = {
      err: onlyAdmin
    }
    res.redirect('/session/new');
    return;
  }
}

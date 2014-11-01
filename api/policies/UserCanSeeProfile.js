module.exports = function  (req, res, ok) {
  var sessionUserMatchesId = req.session.User.id === parseInt(req.param('id'));
  var isAdmin = req.session.User.admin;


  if(!(sessionUserMatchesId || isAdmin)) {
    var noRights = [{name: 'noRights', message: 'noRights'}];
    req.session.flash = {
      err: noRights
    }
    res.redirect('/session/new');
    return;
  }
  ok();
}

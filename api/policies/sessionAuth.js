/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    return next();
  } else {
  	var logonRequiredError = [{name: 'logonRequired', message: 'You must be signed in to view this page'}];

  	req.session.flash = {
  		err: logonRequiredError
  	};
  	res.redirect('/login');
  	return;
  }
};

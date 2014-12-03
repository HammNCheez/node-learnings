/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {


    'new': function(req, res) {
        res.view('auth/new');
    },

    create: function(req, res, next) {
        //check for userId and password in params sent ia the form, if none redirect the browser back to signin page.
        if (!req.param('userId') || !req.param('password')) {
            var usernamePasswordRequiredError = [{
                name: 'usernamePasswordRequired',
                message: 'You must enter both a username and password.'
            }];

            //remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with the
            //key of usernamePasswordRequiredError
            req.session.flash = {
                err: usernamePasswordRequiredError
            };

            res.redirect('/login');
            return;
        }

        //Try to find the user by their userId.
        //findOneByUserId() is a dynamic finder in that it searches the model by a particular attribute
        User.findOneByUserId(req.param('userId'), function foundUser(err, user) {
            if (err) next(err);

            if (!user) {
                var userNotFound = [{
                    name: 'userNotFound',
                    message: 'The User Id [' + req.param('userId') + '] was not found.'
                }];

                req.session.flash = {
                    err: userNotFound
                };

                res.redirect('/login');
                return;
            }

            //Compare password from the form params to the encrypted password of the user found
            bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
                //If the password from the form doesn't match the password from the database
                if (!valid) {
                    var passwordMismatchError = [{
                        name: 'passwordMismatch',
                        message: 'The password provided for user ' + req.param('userId') + ' is incorrect.'
                    }];

                    req.session.flash = {
                        err: passwordMismatchError
                    };

                    res.redirect('/login');
                    return;
                }
            });

            //Log user in
            req.session.authenticated = true;
            req.session.user = user;

            //If admin user then redirect to user list
            if(req.session.user.admin){
                res.redirect('/user');
                return;
            }

            //redirect to their profile page
            res.redirect('/user/show/' + user.userId);
        });
    },

    destroy: function(req, res, next) {
        req.session.destroy();

        res.redirect('/login');
    }
};

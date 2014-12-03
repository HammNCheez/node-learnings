/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    'new': function(req, res) {
        res.view();
    },

    'create': function(req, res) {
        User.create(req.params.all(), function userCreated(err, user) {
            if (err) {
                console.log(err);

                req.session.flash = {
                    err: err
                };

                return res.redirect('user/new');
            }

            //log user in
            req.session.authenticated = true;
            req.session.user = user;

            res.redirect('user/show/' + user.userId);
        });

    },

    show: function(req, res, next) {
        User.findOne({
            userId: req.param('id')
        }, function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            res.view({
                user: user
            });
        });
    },

    index: function(req, res, next) {
        User.find(function foundUsers(err, users) {
            if (err) return next(err);

            res.view({
                users: users
            });
        });
    },

    edit: function(req, res, next) {
        User.findOne({
            userId: req.param('id')
        }, function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next('User does\'t exist');

            res.view({
                user: user
            });
        });
    },

    update: function(req, res, next) {
        User.update({
            userId: req.param('id')
        }, req.params.all(), function userUpdated(err) {
            if (err) {
                return res.redirect('/user/edit/' + req.param('id'));
            }

            res.redirect('/user/show/' + req.param('id'));
        });
    },

    destroy: function(req, res, next) {
        User.findOne({
            userId: req.param('id')
        }, function foundUser(err, user) {
            if (err) return next(err);

            if (!user) return next('User does\'t exist');

            User.destroy({
                userId: req.param('id')
            }, function userDestroyed(err) {
                if (err) return next(err);
            });

            res.redirect('/user');
        });
    }
};

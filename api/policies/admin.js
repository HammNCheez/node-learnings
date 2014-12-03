/**
 *	Allow any authenticated user
 */

module.exports = function(req, res, next) {
    if (req.session.user && req.session.user.admin) {
        return next();
    } else {
        var requireAdminError = [{
            name: 'requireAdminError',
            message: 'You must be an admin to complete this action.'
        }];

        req.session.flash = {
            err: requireAdminError
        };

        res.redirect('/login');
        return;
    }
};

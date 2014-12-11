/*
 * Allow a logged in user to see, edit and update their own profile.
 * Allow admins to see edit and update everyone.
 */

module.exports = function(req, res, next) {
    var sessionUserMatchesId = req.session.user.userId === req.param('id');
    var isAdmin = req.session.user.admin;

    if (!sessionUserMatchesId && !isAdmin) {
        var noRightsError = [{
            name: 'noRights',
            message: 'You must be an admin to view this page.'
        }];
        req.session.flash = {
            err: noRightsError
        };
        res.redirect('login');
        return;
    }
    next();
};

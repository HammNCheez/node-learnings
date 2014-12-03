/**
 * TasksController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    today: function(req, res) {
        res.json({
            task: 'this one'
        });
    }
};

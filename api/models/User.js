/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    schema: true,
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        userId: {
            type: 'string',
            required: true,
            unique: true
        },
        role: {
            type: 'string'
        },
        email: {
            type: 'string',
            required: true,
            email: true
        },
        encryptedPassword: {
            type: 'string'
        },

        admin: {
            type: 'boolean',
            defaultsTo: false
        }


    },

    beforeCreate: function(values, next) {
        if (!values.password || values.password !== values.confirmation) {
            return next({
                err: ["Password doesn't match password confirmation"]
            });
        }

        require('bcrypt-nodejs').hash(values.password, null, null, function passwordEncrypted(err, encryptedPassword) {
            if (err) return next(err);

            values.encryptedPassword = encryptedPassword;
            next();
        });
    },
    
    getTasks: function(userId) {},

    addTask: function(userId, task) {},

    login: function(userId, password) {}
};

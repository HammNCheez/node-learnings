/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true
        },

        description: {
            type: 'string'
        },

        status: {
            type: "string",
            enum: ['new', 'scheduled', 'overdue', 'completed'],
            defaultsTo: 'new'
        },

        date: {
            type: 'datetime'
        }
    }
};

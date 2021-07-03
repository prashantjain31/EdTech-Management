const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var roleSchema = new Schema({

	name: {
		type: String,
		required: true
	},
	scopes:[String]

}, {
    timestamps: true
});

var Roles = mongoose.model('Role',roleSchema);

module.exports =  Roles;
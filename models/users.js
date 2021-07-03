const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({

	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	roleId: {
		type: Schema.Types.ObjectId,
		ref: 'Role',
		default: null
	}

}, {
    timestamps: true
});

var Users = mongoose.model('User',userSchema);
module.exports =  Users;
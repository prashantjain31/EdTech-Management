const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schoolSchema = new Schema({

	name: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	}

}, {
    timestamps: true
});

var Schools = mongoose.model('School',schoolSchema);

module.exports =  Schools;
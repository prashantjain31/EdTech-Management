const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var studentSchema = new Schema({

	name: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	schoolId: {
		type: Schema.Types.ObjectId,
		ref: 'School',
		required: true
	}
	
}, {
    timestamps: true
});

var Students = mongoose.model('Student',studentSchema);

module.exports =  Students;
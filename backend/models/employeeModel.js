const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		company: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Employee', employeeSchema)

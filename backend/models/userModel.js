const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		role: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)

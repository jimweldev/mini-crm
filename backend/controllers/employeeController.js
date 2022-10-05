const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const Employee = require('../models/employeeModel')
const User = require('../models/userModel')

// get all
const getEmployees = async (req, res) => {
	const { role } = req.user

	if (!(role === 'admin' || role === 'employee')) {
		return res.status(400).json({ error: 'Invalid employee role' })
	}

	Employee.aggregate([
		{
			$lookup: {
				from: 'users',
				localField: 'userId',
				foreignField: '_id',
				as: 'userInfo',
			},
		},
		{
			$unwind: '$userInfo',
		},
		{ $sort: { 'userInfo.name': 1 } },
	])
		.then((result) => {
			let data = result.map((v) =>
				Object.assign(
					{},
					{
						_id: v._id,
						userId: v.userInfo['_id'],
						company: v.company,
						name: v.userInfo['name'],
						email: v.userInfo['email'],
					}
				)
			)

			res.status(200).json(data)
		})
		.catch((err) => {
			res.status(400).json('Lookup Collection Error')
		})
}

// get one
const getEmployee = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'No item found' })
	}

	const employee = await Employee.findById(id)

	if (!employee) {
		return res.status(400).json({ error: 'No item found' })
	}

	res.status(200).json(employee)
}

// create one
const createEmployee = async (req, res) => {
	const { email, password, confirmPassword, name, company } = req.body

	if (!email || !password || !confirmPassword || !name || !company) {
		return res.status(400).json({ error: 'All fields are required' })
	}

	const isEmailUsed = await User.findOne({ email })

	if (isEmailUsed) {
		return res.status(400).json({ error: 'Email already used' })
	}

	if (!validator.isEmail(email)) {
		return res.status(400).json({ error: 'Email is invalid' })
	}

	if (!validator.isStrongPassword(password)) {
		return res.status(400).json({ error: 'Password is not strong enough' })
	}

	if (password !== confirmPassword) {
		return res.status(400).json({ error: 'Passwords mismatch' })
	}

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	try {
		const user = await User.create({
			role: 'employee',
			email,
			password: hashedPassword,
			name,
		})
		const employee = await Employee.create({ userId: user._id, company })

		res.status(201).json({ _id: user._id, email, name, company })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// delete one
const deleteEmployee = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'No item found' })
	}

	try {
		const user = await User.findByIdAndDelete({ _id: id })
		const employee = await Employee.findOneAndDelete({ userId: id })

		res.status(200).json(employee)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// update one
const updateEmployee = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'No item found' })
	}

	try {
		const employee = await Employee.findByIdAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{
				new: true,
			}
		)

		res.status(200).json(employee)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	getEmployees,
	getEmployee,
	createEmployee,
	deleteEmployee,
	updateEmployee,
}

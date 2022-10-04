const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// get all
const getUsers = async (req, res) => {
	const { role } = req.user

	if (!(role === 'admin' || role === 'customer')) {
		return res.status(400).json({ error: 'Invalid user role' })
	}

	const users = await User.find({}).sort({ name: 1 })

	res.status(200).json(users)
}

// get one
const getUser = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'No item found' })
	}

	const user = await User.findById(id)

	if (!user) {
		return res.status(400).json({ error: 'No item found' })
	}

	res.status(200).json(user)
}

// create one
const createUser = async (req, res) => {
	const { _id } = req.user
	const { title } = req.body

	if (!title) {
		return res.status(400).json({ error: 'Title is required' })
	}

	try {
		const user = await User.create({ userId: _id, title, isCompleted: false })

		res.status(201).json(user)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// delete one
const deleteUser = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'No item found' })
	}

	try {
		const user = await User.findByIdAndDelete({ _id: id })

		res.status(200).json(user)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// update one
const updateUser = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'No item found' })
	}

	try {
		const user = await User.findByIdAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{
				new: true,
			}
		)

		res.status(200).json(user)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	getUsers,
	getUser,
	createUser,
	deleteUser,
	updateUser,
}

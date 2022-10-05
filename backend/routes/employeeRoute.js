const express = require('express')

const {
	getEmployees,
	getEmployee,
	createEmployee,
	deleteEmployee,
	updateEmployee,
} = require('../controllers/employeeController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

// get all
router.get('/', getEmployees)

// get one
router.get('/:id', getEmployee)

// create one
router.post('/', createEmployee)

// delete one
router.delete('/:id', deleteEmployee)

// update one
router.patch('/:id', updateEmployee)

module.exports = router

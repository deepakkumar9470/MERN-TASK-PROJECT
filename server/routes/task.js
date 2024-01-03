const express  = require('express')

const router = express.Router()
const {}  = require('../controllers/userController');
const { createTask, getTasks, getTaskById, editTask, deleteTask } = require('../controllers/taskController');

// @ /api/task/create 
router.post('/create',createTask);


// @ /api/task
router.get('/' ,getTasks)


// @ /api/task/123
router.get('/:id',getTaskById)

// @ /api/task/124
router.put('/:id', editTask);

// @ /api/task/124
router.delete('/:id', deleteTask);

module.exports = router
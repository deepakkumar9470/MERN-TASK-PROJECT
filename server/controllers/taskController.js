
const Task  = require('../models/Task');


// Creating new task
module.exports.createTask = async (req, res) => {
  try {
    const task = new Task({
        title:req.body.title,
        desc:req.body.desc,
        isCompleted:req.body.isCompleted
      
    });
    await task.save()
    
    res.status(200).json({msg : "Task added", task : task})

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Get all tasks
module.exports.getTasks = async (req, res) => {
   
    try {
      const tasks = await Task.find().sort({createdAt : -1});
      res.status(200).json({tasks})
  
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
}



// Get single task by its id
module.exports.getTaskById = async (req, res) => {
   
    try {
      const task = await Task.findById(req.params.id);
      res.status(200).json({task})
  
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
}
  
// Edit(Update) single task by its id
module.exports.editTask = async (req, res) => {
   
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true});
      res.status(200).json({msg : "Task has been updated.."})
  
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
}


// Delete single task by its id
module.exports.deleteTask = async (req, res) => {
   
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json({msg : "Task has been deleted.."})
  
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
}



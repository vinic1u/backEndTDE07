const express = require("express");
const router = express.Router();

let userTasks = [
    {
        "id": 1,
        "name": "Comprar leite",
        "description": "Ir no mercado da esquina e comprar leite",
        "isDone": false
    },
    {
        "id": 2,
        "name": "Comprar Café",
        "description": "Ir no mercado da esquina e comprar Café",
        "isDone": true
    }
];

// Get all tasks
router.get("/tasks",(req,res) => {
    return res.status(200).json(userTasks);
})

// Get task by id
router.get("/tasks/:id",(req,res) => {
    const idTask = Number(req.params.id);
    const task = userTasks.find((task) => task.id === idTask);
    
    if(task){
        return res.status(200).json(task);
    }
    return res.json({"message" : `idTask ${idTask} not found`}).send();
})

// Create a new Task
router.post("/tasks",(req,res) => {
    const data = req.body;
    const task = {   
        "id" : userTasks.length + 1,
        "name" : data.name,
        "description" : data.description,
        "isDone" : data.isDone
    }
    if(!task){
        return res.status(400).send();
    }
    userTasks.push(task);
    return res.status(201).json(task);
})

// Edit a Task
router.put("/tasks/:id",(req,res) => {
    const data = req.body;
    const taskId = Number(req.params.id);

    const task = userTasks.find((task) => task.id === taskId);
    if(!task){
        return res.status(404).json({"message" : `task with id ${taskId} doest not exist`});
    }

    task.name = data.name;
    task.description = data.description;
    task.isDone = data.isDone;

    return res.status(200).json(task);
})

// Delete a task
router.delete("/tasks/:id",(req,res) => {
    const taskId = Number(req.params.id);

    const task = userTasks.find((task) => task.id === taskId);
    if(!task){
        return res.status(404).json({"message" : `task with id ${taskId} doest not exist`});
    }
    userTasks = userTasks.filter((task) => task.id !== taskId);
    res.status(204).send();
})




module.exports = {
    router
}
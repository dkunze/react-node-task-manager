const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

let tasks = [
  { id: 1, title: 'Finish React Project', completed: false },
  { id: 2, title: 'Prepare for Interview', completed: false },
]

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body
  const newTask = { id: tasks.length + 1, title, completed: false }
  tasks.push(newTask)
  res.status(201).json(newTask)
})

// Update a task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body

  let task = tasks.find((task) => task.id === parseInt(id))
  if (task) {
    task.title = title || task.title
    task.completed = completed !== undefined ? completed : task.completed
    res.json(task)
  } else {
    res.status(404).send('Task not found')
  }
})

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params
  tasks = tasks.filter((task) => task.id !== parseInt(id))
  res.status(204).end()
})

app.listen(port, () => {
  console.log(`Server is runing on http://locahost:${port}`)
})

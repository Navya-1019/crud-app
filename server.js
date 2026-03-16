const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err))

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  course: String
})

const Student = mongoose.model('Student', studentSchema)

// CREATE - Add a student
app.post('/students', async (req, res) => {
  const student = new Student(req.body)
  await student.save()
  res.json(student)
})

// READ - Get all students
app.get('/students', async (req, res) => {
  const students = await Student.find()
  res.json(students)
})

// UPDATE - Edit a student
app.put('/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(student)
})

// DELETE - Remove a student
app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id)
  res.json({ message: 'Student deleted!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
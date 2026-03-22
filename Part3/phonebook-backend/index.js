require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// 2. Importamos nuestro modelo de Mongoose
const Person = require('./models/person')

const app = express()

// 3. Middlewares
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

// Configuración de Morgan
morgan.token('postData', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return ' '
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

// ==========================================
// RUTAS CONECTADAS A MONGODB (Ejercicios 3.13 y 3.14)
// ==========================================

// Ejercicio 3.13: Obtener todos desde MongoDB
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Ejercicio 3.14: Guardar uno nuevo en MongoDB
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number is missing' })
  }

  // Por ahora, ignoraremos si el nombre está duplicado como dice el ejercicio 3.14
  // Creamos el nuevo objeto usando el modelo Person de Mongoose
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  // Guardamos en la base de datos y respondemos con el dato guardado
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

// ==========================================
// RUTAS TEMPORALES (Aún no usan MongoDB - Las actualizaremos luego)
// ==========================================

app.get('/info', (request, response) => {
  // ATENCIÓN: Por ahora esto contará las personas en MongoDB
  Person.find({}).then(persons => {
    const numberOfPeople = persons.length
    const currentDate = new Date()
    const infoTemplate = `
      <p>Phonebook has info for ${numberOfPeople} people</p>
      <p>${currentDate}</p>
    `
    response.send(infoTemplate)
  })
})

// Obtener un solo contacto (aún usa lógica vieja, fallará si le pasas un ID de Mongo)
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  response.status(404).json({ error: 'This route is not connected to MongoDB yet' })
})

// Eliminar un contacto (aún usa lógica vieja)
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  response.status(404).json({ error: 'This route is not connected to MongoDB yet' })
})

// ==========================================
// INICIO DEL SERVIDOR
// ==========================================

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
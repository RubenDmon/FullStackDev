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
// RUTAS CONECTADAS A MONGODB (Ejercicios 3.15 - 3.18)
// ==========================================

// Ejercicio 3.18: Ruta /info conectada a MongoDB
app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const currentDate = new Date()
      const infoTemplate = `
        <p>Phonebook has info for ${count} people</p>
        <p>${currentDate}</p>
      `
      response.send(infoTemplate)
    })
    .catch(error => next(error))
})

// Ejercicio 3.18: Obtener un solo contacto por ID de Mongo
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end() // El ID tiene buen formato, pero no existe
      }
    })
    .catch(error => next(error)) // Si el ID tiene mal formato, pasa al Error Handler
})

// Ejercicio 3.15: Eliminar un contacto de MongoDB
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Ejercicio 3.17: Actualizar un contacto existente
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  // { new: true } es crucial para que Mongoose nos devuelva el objeto YA actualizado
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})
// ==========================================
// MIDDLEWARES DE CONTROL (Deben ir al final)
// ==========================================

// 1. Manejador de endpoints desconocidos (Si el usuario pide una ruta que no existe)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// 2. Ejercicio 3.16: Manejador centralizado de errores
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  // Si el error es por un ID mal formateado de MongoDB
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  // Si es otro tipo de error, lo pasamos al manejador por defecto de Express
  next(error)
}
app.use(errorHandler)

// ==========================================
// INICIO DEL SERVIDOR
// ==========================================
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
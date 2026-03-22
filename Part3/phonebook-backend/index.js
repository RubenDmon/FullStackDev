const express = require('express')
const app = express()
app.use(express.json())
let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  // 1. Contamos cuántas personas hay en el arreglo actual
  const numberOfPeople = persons.length
  
  // 2. Obtenemos la fecha y hora exactas en las que se hizo la petición
  const currentDate = new Date()
  
  // 3. Armamos el HTML usando plantillas literales (los acentos graves ` `) 
  // para poder inyectar nuestras variables y usar las etiquetas <p>
  const infoTemplate = `
    <p>Phonebook has info for ${numberOfPeople} people</p>
    <p>${currentDate}</p>
  `
  
  // 4. Enviamos el HTML como respuesta (usamos .send en lugar de .json)
  response.send(infoTemplate)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    // Si no lo encuentra, devuelve un 404 (Not Found)
    response.status(404).end()
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  
  // Reemplazamos nuestra lista actual con una nueva que NO contenga ese ID
  persons = persons.filter(p => p.id !== id)

  // Respondemos con 204 (No Content) para indicar que se borró con éxito
  response.status(204).end()
})
app.post('/api/persons', (request, response) => {
  const body = request.body

  // 1. Validaciones (Ejercicio 3.6)
  if (!body.name || !body.number) {
    // 400 = Bad Request (Petición malformada)
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  // Comprobamos si el nombre ya existe
  const nameExists = persons.some(p => p.name === body.name)
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  // 2. Creación del nuevo contacto (Ejercicio 3.5)
  // Generamos un ID aleatorio grande (por ejemplo, entre 0 y 1000000)
  const generateId = () => {
    return Math.floor(Math.random() * 1000000)
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  // Agregamos a la persona a nuestra lista en memoria
  persons = persons.concat(newPerson)

  // Respondemos devolviendo el objeto recién creado
  response.json(newPerson)
})
const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
const mongoose = require('mongoose')

// Validamos que al menos se pase la contraseña
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://rubendavidmnoared_db_user:${password}@cluster0.fm9pwzu.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// 1. Definimos el Esquema (Schema) para nuestra agenda
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// 2. Definimos el Modelo
// Mongoose creará automáticamente una colección llamada "people" (el plural de Person)
const Person = mongoose.model('Person', personSchema)

// 3. Lógica principal basada en la cantidad de argumentos
if (process.argv.length === 3) {
  // CASO A: Solo se pasó la contraseña -> Mostrar todos los contactos
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  // CASO B: Se pasó contraseña, nombre y número -> Crear un nuevo contacto
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close() // Cerramos la conexión DENTRO del .then()
  })
} else {
  console.log('Incorrect number of arguments. Use: node mongo.js <password> [<name> <number>]')
  mongoose.connection.close()
}
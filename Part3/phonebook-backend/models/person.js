const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Definimos el esquema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Transformamos el _id de Mongo a un string normal llamado "id"
// y eliminamos la propiedad __v (versión de Mongo)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Exportamos el modelo
module.exports = mongoose.model('Person', personSchema)
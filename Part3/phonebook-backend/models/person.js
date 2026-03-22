const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

// Después (Correcto)
mongoose.connect(url)
  .then(() => { // <--- Paréntesis vacíos, ya no hay variable sin usar
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Definimos el esquema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(v) {
        // Expresión regular: 2 o 3 dígitos ^\d{2,3}, un guion -, seguidos de 1 o más dígitos \d+$
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! Format must be XX-XXXXXXX or XXX-XXXXXXX`
    }
  }
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
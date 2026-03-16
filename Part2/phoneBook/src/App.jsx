import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import { useState, useEffect } from 'react'
import personService from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleInputNameChange = (event) => setNewName(event.target.value)
  const handleInputNumberChange = (event) => setNewNumber(event.target.value)
  const handleInputSearchChange = (event) => setSearch(event.target.value)

  // Ejercicios 2.12 y 2.15: Crear o Actualizar
const handleAddPerson = event => {
    event.preventDefault()
    
    // Búsqueda insensible a mayúsculas
    const existingPerson = persons.find(
      person => person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    )

    if (existingPerson) {
      console.log('¡Contacto encontrado! Es este:', existingPerson)
      
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
      
      if (confirmUpdate) {
        const changedPerson = { ...existingPerson, number: newNumber }
        console.log('Enviando petición PUT con estos datos:', changedPerson)
        
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            console.log('Respuesta del servidor al actualizar:', returnedPerson)
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      console.log('Contacto no encontrado. Creando uno nuevo...')
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  // Ejercicio 2.14: Eliminar persona
  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          // Filtramos el estado para quitar a la persona eliminada
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const personToShow = search
    ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleInputSearchChange={handleInputSearchChange} />
      
      <h3>Add a new</h3>
      <Form 
        handleAddPerson={handleAddPerson} 
        handleInputNameChange={handleInputNameChange} 
        handleInputNumberChange={handleInputNumberChange}
        newName={newName} 
        newNumber={newNumber} 
      />
      
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App
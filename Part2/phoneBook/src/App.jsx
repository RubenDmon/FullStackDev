import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Notification from './components/Notification' 
import { useState, useEffect } from 'react'
import personService from './services/Persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const showNotification = (msg, type = 'success') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000) 
  }

  const handleInputNameChange = (event) => setNewName(event.target.value)
  const handleInputNumberChange = (event) => setNewNumber(event.target.value)
  const handleInputSearchChange = (event) => setSearch(event.target.value)

  const handleAddPerson = event => {
    event.preventDefault()
    
    const existingPerson = persons.find(
      person => person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    )

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
      
      if (confirmUpdate) {
        const changedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${returnedPerson.name}'s number`) // Notificación de éxito
          })
          .catch(error => {
            // Ejercicio 2.17: Manejo del error si la persona ya fue eliminada del servidor
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              'error'
            )

            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
    } else {
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
          showNotification(`Added ${returnedPerson.name}`) // Notificación de éxito
        })
    }
  }

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Deleted ${name}`) 
        })
        .catch(error => {
             showNotification(`Information of ${name} has already been removed from server`, 'error')
             setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const personToShow = search
    ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={message} type={messageType} />
      
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
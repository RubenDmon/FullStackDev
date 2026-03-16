import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const personToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleInputNameChange(event) {
    setNewName(event.target.value)
  }
  function handleInputNumberChange(event) {
    setNewNumber(event.target.value)
  }
  function handleInputSearchChange(event) {
    setSearch(event.target.value)
  }
  const handleAddPerson = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`"${newName}" is already added to phonebook`);
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleInputSearchChange={handleInputSearchChange}></Filter>
      <h3>Add a new</h3>
      <Form handleAddPerson={handleAddPerson} handleInputNameChange={handleInputNameChange} handleInputNumberChange={handleInputNumberChange}
        newName={newName} newNumber={newNumber}></Form>
      <h3>Numbers</h3>
      <Persons personToShow={personToShow}></Persons>
    </div>
  )
}

export default App
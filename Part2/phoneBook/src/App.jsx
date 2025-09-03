import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
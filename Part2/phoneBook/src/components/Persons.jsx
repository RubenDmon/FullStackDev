
const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </li>
  )
}

const Persons = ({ personToShow, handleDeletePerson }) => {
  return (
    <ul>
      {personToShow.map(person => {
        return (
          <Person 
            key={person.id} 
            person={person} 
            deletePerson={() => handleDeletePerson(person.id, person.name)}
          />
        )
      })}
    </ul>
  )
}

export default Persons;
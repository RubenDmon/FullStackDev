const Person = ({ person }) => {
    return (
        <li>{person.name} {person.number}</li>
    )
}

const Persons = ({ personToShow }) => {
    return (
        <ul>
            {personToShow.map(person => {
                return <Person person={person} key={person.name}></Person>
            })}
        </ul>
    )
}
export default Persons;
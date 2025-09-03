const Form = ({ handleAddPerson, handleInputNameChange, handleInputNumberChange, newName, newNumber }) => {
    return (
        <form onSubmit={handleAddPerson}>
            <div>
                name: <input value={newName} onChange={handleInputNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleInputNumberChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default Form;
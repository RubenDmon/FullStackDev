const Filter = ({ search, handleInputSearchChange }) => {
    return (
        <div>
            <p>filter shown with <input value={search} onChange={handleInputSearchChange}></input></p>
        </div>
    )
}

export default Filter;
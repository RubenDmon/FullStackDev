import { useState, useEffect } from 'react'
import axios from 'axios'

// 1. Recibimos una nueva prop: handleShow
const Countries = ({ countries, handleShow }) => {
  if (countries.length === 0) return null

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  // 2. Modificamos la lista para incluir el botón
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.name.common}>
            {country.name.common} 
            <button onClick={() => handleShow(country.name.common)}>
              show
            </button>
          </li>
        ))}
      </ul>
    )
  }

  const country = countries[0]
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        width="150" 
      />
    </div>
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  // 3. Creamos la función que actualizará el buscador al hacer clic
  const handleShow = (name) => {
    setSearch(name)
  }

  const filteredCountries = search
    ? countries.filter(country => 
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : []

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      
      <Countries countries={filteredCountries} handleShow={handleShow} />
    </div>
  )
}

export default App
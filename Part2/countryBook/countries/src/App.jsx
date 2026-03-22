import { useState, useEffect } from 'react'
import axios from 'axios'

// Componente para mostrar la lista o los detalles del país
const Countries = ({ countries }) => {
  // Si no hay búsqueda o no hay resultados, no mostramos nada
  if (countries.length === 0) return null

  // Si hay más de 10 resultados
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  // Si hay entre 2 y 10 resultados (lista simple)
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    )
  }

  // Si hay exactamente 1 resultado (vista detallada)
  const country = countries[0]
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      
      <h3>languages:</h3>
      <ul>
        {/* Los idiomas vienen como un objeto, así que usamos Object.values para extraerlos en un array */}
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

  // useEffect para obtener TODOS los países al inicio
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

  // Filtramos la lista de países basada en la búsqueda actual
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
      
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App
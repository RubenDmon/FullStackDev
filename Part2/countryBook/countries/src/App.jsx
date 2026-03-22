import { useState, useEffect } from 'react'
import axios from 'axios'

// 1. Nuevo componente exclusivo para mostrar 1 país y su clima
const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)
  
  // Obtenemos la llave de las variables de entorno de Vite
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    // Algunos países tienen múltiples capitales, tomamos la primera
    const capital = country.capital[0] 
    
    // Hacemos la petición a OpenWeatherMap (units=metric es para Celsius)
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.log("Error fetching weather:", error)
      })
  }, [country.capital, api_key]) // El efecto se ejecuta cuando cambia el país

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital.join(', ')}</div>
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

      {/* 2. Solo mostramos la sección del clima cuando los datos hayan cargado */}
      {weather && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <div>temperature {weather.main.temp} Celcius</div>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt="weather icon" 
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}

// El componente Countries ahora es más limpio
const Countries = ({ countries, handleShow }) => {
  if (countries.length === 0) return null

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

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

  // 3. Cuando hay 1 solo resultado, renderizamos nuestro nuevo componente
  return <CountryDetail country={countries[0]} />
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

  const handleSearchChange = (event) => setSearch(event.target.value)
  const handleShow = (name) => setSearch(name)

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
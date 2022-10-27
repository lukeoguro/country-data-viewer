import axios from 'axios';
import { useEffect, useState } from 'react';

function Country({ country }) {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const request = axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        APPID: process.env.REACT_APP_API_KEY,
        units: 'metric',
        lat: country.capitalInfo.latlng[0],
        lon: country.capitalInfo.latlng[1],
      }
    });

    request.then(response => {
      setWeather({
        temp: response.data.main.temp,
        wind: response.data.wind.speed,
        iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      });
    });
  }, [country]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km<sup>2</sup></p>
      <p><b>Languages:</b></p>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key} >
            {value}
          </li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature: {weather.temp} C</p>
      <img src={weather.iconUrl} alt={`${country.name.common} weather`} />
      <p>Wind: {weather.wind} m/s</p>
    </>
  )
}

function Countries({ countries, query, handleQueryChange }) {
  const queriedCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(query.toLowerCase());
  });

  if (countries.length === 0) {
    return (<p>Loading...</p>);
  } else if (queriedCountries.length > 10) {
    return (<p>Too many matches, please specify another filter.</p>);
  } else if (queriedCountries.length > 1) {
    return (
      queriedCountries.map(country => (
        <div key={country.name.official}>
          {country.name.common}
          <button value={country.name.common} onClick={handleQueryChange}>
            Show
          </button>
        </div>
      ))
    );
  } else if (queriedCountries.length === 1) {
    return (<Country country={queriedCountries[0]} />);
  } else {
    return (<p>No matches.</p>);
  }
}

export default Countries;
import axios from 'axios';
import { useEffect, useState } from 'react';

import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const request = axios.get('https://restcountries.com/v3.1/all');
    request.then(response => setCountries(response.data));
  }, []);

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div>
      Find countries: <input value={query} onChange={handleQueryChange} />
      <Countries
        query={query}
        countries={countries}
        handleQueryChange={handleQueryChange}
      />
    </div>
  );
}

export default App;

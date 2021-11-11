import React, { useState, useEffect } from 'react';
import { Search } from './components/Search';
import { isSubstring } from './utils';
import { List } from './components/List';
import axios from 'axios';
import { Country } from './components/Countries';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [spotlight, setSpotlight] = useState(null);

  const changeSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      const countryNames = response.data.map((c) => c.name.common);
      setCountries(countries.concat(countryNames));
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const filteredCountries = countries.filter((c) => isSubstring(search, c));
    if (filteredCountries.length === 1) {
      const name = filteredCountries[0];
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((response) => {
          setSpotlight(response.data[0]);
        });
    } else setSpotlight(null);
    // eslint-disable-next-line
  }, [search]);

  return (
    <div>
      <h1>Search for a Country</h1>
      <div>
        <Search handleChange={changeSearch} />
        {spotlight !== null ? (
          <Country country={spotlight} />
        ) : (
          <List search={search} values={countries} />
        )}
      </div>
    </div>
  );
};

export default App;

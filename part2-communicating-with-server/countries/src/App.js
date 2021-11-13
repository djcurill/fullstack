import React, { useState, useEffect } from 'react';
import { Search } from './components/Search';
import { isSubstring } from './utils';
import { ListCountries } from './components/List';
import axios from 'axios';
import { Country } from './components/Country';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [spotlight, setSpotlight] = useState(null);

  const changeSearch = (event) => {
    setSearch(event.target.value);
    setSpotlight(null);
  };

  const showCountryDetails = (countryName) => {
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((response) => {
        setSpotlight(response.data[0]);
      });
  };

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      const countryNames = response.data.map((c) => {
        return {
          name: c.name.common,
          showDetails: () => {
            showCountryDetails(c.name.common);
          },
        };
      });
      setCountries(countries.concat(countryNames));
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const res = countries.filter((c) => isSubstring(search, c.name));

    if (res.length === 1) {
      const country = res[0];
      axios
        .get(
          `https://restcountries.com/v3.1/name/${country.name}?fullText=true`
        )
        .then((response) => {
          setSpotlight(response.data[0]);
        });
    }
    // eslint-disable-next-line
  }, [search]);

  let showCountries = search
    ? countries.filter((c) => isSubstring(search, c.name))
    : countries;

  return (
    <div>
      <h1>Search for a Country</h1>
      <div>
        <Search handleChange={changeSearch} />
        {spotlight === null && (
          <ListCountries values={showCountries} showDetails={search} />
        )}
        {spotlight !== null && <Country country={spotlight} />}
      </div>
    </div>
  );
};

export default App;

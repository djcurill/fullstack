import React from 'react';
import { List } from './List';

const Country = ({ country }) => {
  console.log(country);
  const languages = Object.values(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital(s): {country.capital.join(',')}</p>
      <h2>Languages</h2>
      <List search={''} values={languages} />
      <img
        src={`${country.flags.png}`}
        alt={`Flag of ${country.name.common}`}
      />
    </div>
  );
};

export { Country };

import React, { useEffect, useState } from 'react';
import { List } from './List';
import { Weather } from './Weather';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState({
    city: '',
    temperature: '',
    windSpeed: '',
    windDirection: '',
    icon: '',
  });

  useEffect(() => {
    // gather weather data here
    console.log(process.env);

    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital[0]}`
      )
      .then((res) => {
        console.log(res.data);
        setWeather({
          ...weather,
          city: res.data.location.name,
          temperature: res.data.current.temperature,
          icon: res.data.current.weather_icons[0],
          windDirection: res.data.current.wind_dir,
          windSpeed: res.data.current.wind_speed,
        });
      }); // eslint-disable-next-line
  }, []);
  const languages = Object.values(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital(s): {country.capital.join(',')}</p>
      <h2>Languages</h2>
      <List values={languages} />
      <img
        src={`${country.flags.png}`}
        alt={`Flag of ${country.name.common}`}
      />
      <Weather weather={weather} />
    </div>
  );
};

export { Country };

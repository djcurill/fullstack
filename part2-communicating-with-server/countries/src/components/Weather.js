const Weather = ({ weather }) => {
  if (weather !== undefined) {
    return (
      <div>
        <h2>Current Weather in {weather.city}</h2>
        <p>
          <strong>Temperature: </strong> {weather.temperature} Celcius
        </p>
        <p>
          <strong>Wind: </strong>{' '}
          {`${weather.windSpeed} km/h ${weather.windDirection}`}
        </p>
        <img src={weather.icon} alt="weather icon"></img>
      </div>
    );
  } else {
    return <></>;
  }
};

export { Weather };

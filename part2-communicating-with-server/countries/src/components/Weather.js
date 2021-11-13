/*
This component is currently throwing an error because nothing is returned
to be rendered. I think the issue is it needs to return something right away,
and then re-render when the state has been changed.

Next Steps:
1. Create state for the Weather component, or ... the Country component
2. Apply useEffect() to gather the data post render and ultimately change the state
3. Then add the component to the App.js file
*/
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

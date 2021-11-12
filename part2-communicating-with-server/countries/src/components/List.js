const ListCountries = ({ values, showDetails = false }) => {
  if (values.length > 0)
    return (
      <ul>
        {values.map((c) => (
          <li key={c.name}>
            {c.name}
            {showDetails && <button onClick={c.showDetails}>Details</button>}
          </li>
        ))}
      </ul>
    );
  else return <></>;
};

const List = ({ values }) => {
  if (values.length > 0)
    return (
      <ul>
        {values.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  else return <></>;
};

export { ListCountries, List };

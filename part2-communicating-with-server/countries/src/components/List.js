import { isSubstring } from '../utils';

const List = ({ search, values }) => {
  let results = search ? values.filter((c) => isSubstring(search, c)) : values;
  return (
    <ul>
      {results.map((val) => (
        <li key={val}>{val}</li>
      ))}
    </ul>
  );
};

export { List };

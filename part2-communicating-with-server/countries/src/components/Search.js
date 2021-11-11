import React from 'react';

const Search = (props) => {
  return (
    <form>
      <label htmlFor="filter">Find countries</label>
      <input type="text" id="filter" onChange={props.handleChange} />
    </form>
  );
};

export { Search };

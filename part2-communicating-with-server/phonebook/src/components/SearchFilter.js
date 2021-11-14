import React from 'react';

export const SearchFilter = (props) => {
  return (
    <div>
      {'Filter Numbers by Name: '}
      <input onChange={props.handleChange} type="text" />
    </div>
  );
};

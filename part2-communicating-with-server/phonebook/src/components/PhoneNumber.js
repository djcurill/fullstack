import React from 'react';

export const PhoneNumber = ({ person, deleteHandle }) => {
  return (
    <li>
      {person.name} : {person.number}
      <button onClick={() => deleteHandle(person)}>Delete</button>
    </li>
  );
};

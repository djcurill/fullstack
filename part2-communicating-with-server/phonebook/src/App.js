import React, { useEffect, useState } from 'react';
import { isSubstring } from './utils';
import axios from 'axios';

const PhoneNumbers = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <PhoneNumber
          key={person.id}
          name={person.name}
          number={person.number}
        />
      ))}
    </ul>
  );
};

const PhoneNumber = ({ id, name, number }) => {
  return (
    <li>
      {name} : {number}
    </li>
  );
};

const SearchFilter = (props) => {
  return (
    <div>
      {'Filter Numbers by Name: '}
      <input onChange={props.handleChange} type="text" />
    </div>
  );
};

const Form = (props) => {
  return (
    <form onSubmit={props.addContact}>
      <div>
        <label htmlFor="contact-name">Name: </label>
        <input id="contact-name" onChange={props.handleName} />
      </div>
      <div>
        <label htmlFor="phone-number">Phone Number: </label>
        <input id="phone-number" onChange={props.handlePhoneNumber} />
      </div>
      <div>
        <button type="submit">Add Contact</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [searchField, setSearchField] = useState('');

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleNewSearchField = (event) => {
    setSearchField(event.target.value);
  };

  const addPhoneNumber = (event) => {
    event.preventDefault();
    if (persons.find((x) => x.name === newName) !== undefined)
      alert(`${newName} is already added to phonebook`);
    else
      setPersons(
        persons.concat({
          name: newName,
          number: newPhoneNumber,
          id: persons.length + 1,
        })
      );
  };

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(persons.concat(response.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const personsToShow = searchField
    ? persons.filter((person) => isSubstring(person.name, searchField))
    : persons;

  return (
    <div>
      <h1>Phone Book</h1>
      <SearchFilter handleChange={handleNewSearchField} />
      <h1>Add New Number</h1>
      <Form
        addContact={addPhoneNumber}
        handleName={handleNewName}
        handlePhoneNumber={handleNewPhoneNumber}
      />
      <h2>Phone Numbers</h2>
      <PhoneNumbers persons={personsToShow} />
    </div>
  );
};

export default App;

import React, { useState } from 'react';

const PhoneNumbers = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <PhoneNumber name={person.name} phoneNumber={person.phoneNumber} />
      ))}
    </ul>
  );
};

const PhoneNumber = ({ name, phoneNumber }) => {
  return (
    <li key={name}>
      {' '}
      {name} : {phoneNumber}{' '}
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
  const [persons, setPersons] = useState([
    {
      name: 'Daniel Curilla',
      phoneNumber: '000-000-0000',
    },
  ]);

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
        persons.concat({ name: newName, phoneNumber: newPhoneNumber })
      );
  };

  const isSubstring = (entity, subString) => {
    return entity.toLowerCase().includes(subString.toLowerCase());
  };

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

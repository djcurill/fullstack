import React, { useEffect, useState } from 'react';
import { isSubstring } from './utils';
import phoneService from './services/phonenumber';

const PhoneNumber = ({ person, deleteHandle }) => {
  return (
    <li>
      {person.name} : {person.number}
      <button onClick={() => deleteHandle(person)}>Delete</button>
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

    const existingContact = persons.find((p) => p.name === newName);

    if (existingContact) {
      if (
        window.confirm(
          `Do you wish to update ${existingContact.name} contact info?`
        )
      ) {
        const updatePerson = { ...existingContact, number: newPhoneNumber };
        console.log(updatePerson);
        phoneService.update(updatePerson).then((response) => {
          setPersons(persons.map((p) => (p.id === response.id ? response : p)));
        });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNumber,
      };
      phoneService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
        })
        .catch((err) => console.log(err));
    }
  };

  const deletePerson = (removePerson) => {
    if (window.confirm(`Delete ${removePerson.name}?`)) {
      phoneService.remove(removePerson).then((deletedContact) => {
        setPersons(persons.filter((p) => p.id !== removePerson.id));
      });
    }
  };

  useEffect(() => {
    phoneService
      .getAll()
      .then((phonenumbers) => setPersons(persons.concat(phonenumbers)));
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
      <ul>
        {personsToShow.map((person, i) => {
          return (
            <PhoneNumber person={person} key={i} deleteHandle={deletePerson} />
          );
        })}
      </ul>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { isSubstring } from './utils';
import phoneService from './services/phonenumber';
import { PhoneNumber } from './components/PhoneNumber';
import { SearchFilter } from './components/SearchFilter';
import { Form } from './components/Form';
import {
  SuccessNotification,
  ErrorNotification,
} from './components/Notification';

const FIVE_SECONDS = 5000;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [searchField, setSearchField] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

        phoneService
          .update(updatePerson)
          .then((newPerson) => {
            setPersons(
              persons.map((p) => (p.id === newPerson.id ? newPerson : p))
            );
            return newPerson;
          })
          .then((person) => {
            setSuccessMessage(
              `${person.name} was successfully updated in contacts`
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, FIVE_SECONDS);
          })
          .catch((err) => {
            setErrorMessage(err.message);
            setTimeout(() => {
              setErrorMessage(null);
            }, FIVE_SECONDS);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNumber,
      };
      phoneService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          return createdPerson;
        })
        .then((createdPerson) => {
          setSuccessMessage(
            `${createdPerson.name} was successfully added to contacts`
          );
          setTimeout(() => {
            setSuccessMessage(null);
          }, FIVE_SECONDS);
        });
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
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
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

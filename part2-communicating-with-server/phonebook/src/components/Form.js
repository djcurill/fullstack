import React from 'react';

export const Form = (props) => {
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

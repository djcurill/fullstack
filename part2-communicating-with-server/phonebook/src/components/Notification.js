import React from 'react';

const SuccessNotification = ({ message }) => {
  if (message == null) return null;

  const styleClass = {
    background: 'lightgray',
    color: 'green',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={styleClass}>{message}</div>;
};

const ErrorNotification = ({ message }) => {
  if (message == null) return null;

  const styleClass = {
    background: 'lightgray',
    color: 'red',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={styleClass}>{message}</div>;
};

export { SuccessNotification, ErrorNotification };

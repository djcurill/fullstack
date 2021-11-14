import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (contact) => {
  return axios.post(baseUrl, contact).then((response) => response.data);
};

const remove = (contact) => {
  return axios
    .delete(`${baseUrl}/${contact.id}`)
    .then((response) => response.data);
};

const update = (contact) => {
  return axios
    .put(`${baseUrl}/${contact.id}`, contact)
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(`Unable to update information for: ${contact.name}`);
    });
};

const phoneService = { getAll, create, remove, update };
export default phoneService;

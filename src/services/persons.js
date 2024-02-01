import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (dataSend) => {
  const request = axios.post(baseUrl, dataSend);
  return request.then((response) => response.data);
};

const updatePerson = (id, obj) => {
  const request = axios.put(`${baseUrl}/${id}`, obj);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
};

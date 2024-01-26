import { useState, useEffect } from "react";
import personService from "./services/persons";
import Header from "./components/Header";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const getDataFromServer = () => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  useEffect(getDataFromServer, []);

  const handleChangeName = (event) => setNewName(event.target.value);
  const handleChangeNumber = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const checkDuplicateName = (name) => {
    if (name) return persons.some((person) => person.name === name.name);
  };
  const checkDuplicateNumber = (number) => {
    if (number)
      return persons.some((person) => person.number === number.number);
  };

  const addName = (event) => {
    event.preventDefault();
    const nameToAdd = {
      name: newName,
      number: newNumber,
    };

    if (checkDuplicateName(nameToAdd) === true) {
      alert(`${nameToAdd.name} is already added to phonebook! 🚨`);
    } else if (checkDuplicateNumber(nameToAdd) === true) {
      alert(`${nameToAdd.number} is already added to phonebook! 🚨`);
    } else {
      personService.createPerson(nameToAdd).then((returnNote) => {
        setPersons(persons.concat(returnNote));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange} />

      <Header title="Add a new" />
      <PersonForm
        addName={addName}
        handleChangeName={handleChangeName}
        newName={newName}
        handleChangeNumber={handleChangeNumber}
        newNumber={newNumber}
      />

      <Header title="Numbers" />

      <Persons persons={filteredPerson} />
    </div>
  );
};

export default App;

import { useState } from "react";
import Header from "./components/Header";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 1, number: "0987654321" },
    { name: "Ada Lovelace", number: "4455323523", id: 2 },
    { name: "Dan Abramov", number: "1243234345", id: 3 },
    { name: "Mary Poppendieck", number: "39236423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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
      id: persons.length + 1,
    };

    if (checkDuplicateName(nameToAdd) === true) {
      alert(`${nameToAdd.name} is already added to phonebook! 🚨`);
    } else if (checkDuplicateNumber(nameToAdd) === true) {
      alert(`${nameToAdd.number} is already added to phonebook! 🚨`);
    } else {
      setPersons(persons.concat(nameToAdd));
      setNewName("");
      setNewNumber("");
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

import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 1, number: "0987654321" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleChangeName = () => setNewName(event.target.value);
  const handleChangeNumber = () => setNewNumber(event.target.value);

  const checkDuplicateName = (name) => {
    if (name) return persons.some((person) => person.name === name.name);
  };
  const checkDuplicateNumber = (number) => {
    if (number)
      return persons.some((person) => person.number === number.number);
  };

  const addName = () => {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleChangeName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleChangeNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      <div>
        debug:{newName} {newNumber}
      </div>
      {persons.map((person) => (
        <div key={person.name}>
          debug: {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;

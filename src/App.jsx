import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChange = () => setNewName(event.target.value);

  const addName = () => {
    event.preventDefault();
    const nameToAdd = {
      name: newName,
    };

    setPersons(persons.concat(nameToAdd));
    setNewName("");
  };

  // console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      <div>debug: {newName}</div>
      {persons.map((newName) => (
        <div key={newName.name}>debug: {newName.name}</div>
      ))}
    </div>
  );
};

export default App;

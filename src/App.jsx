import { useState, useEffect } from "react";
import personService from "./services/persons";
import Header from "./components/Header";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

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
    return persons.find((person) => person.name === name.name) || null;
  };

  const addName = (event) => {
    event.preventDefault();
    const nameToAdd = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = checkDuplicateName(nameToAdd);

    if (existingPerson !== null) {
      const confirmation = window.confirm(
        `${existingPerson.name} is already added to phonebook! Do you want to update the number?`
      );
      if (confirmation) {
        const personIdToUpdate = existingPerson.id;
        const updatedPerson = { name: newName, number: newNumber };

        personService
          .updatePerson(personIdToUpdate, updatedPerson)
          .then(() => {
            setPersons(
              persons.map((person) =>
                person.id === personIdToUpdate
                  ? { ...person, ...updatedPerson }
                  : person
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log("Error updating person: ", error);
          });
      }
    } else {
      personService.createPerson(nameToAdd).then((returnPerson) => {
        setPersons(persons.concat(returnPerson));
        setMessage(`Added '${nameToAdd.name}'`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    const personToDelete = persons.filter((person) => person.id === id);
    if (
      window.confirm(`Do you really want to delete ${personToDelete[0].name} ?`)
    ) {
      personService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

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

      <Persons persons={filteredPerson} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

const PersonForm = ({
  addName,
  handleChangeName,
  newName,
  handleChangeNumber,
  newNumber,
}) => {
  return (
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
  );
};

export default PersonForm;

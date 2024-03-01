function deleteItem(id, db) {
  db.splice(id, 1);
  return db;
}

export default function helpFormNotes(db, form) {
  const newDb = [...db];
  const filteredDb = [];
  if (form.id === "") {
    const newForm = { ...form, id: newDb.length.toString() };
    newDb.push(newForm);
    return newDb;
  } else if (form.id !== "" && !form.name && !form.text) {
    const deletedItem = deleteItem(form.id, newDb);
    return deletedItem;
  } else if (form.id !== "") {
    newDb.map((el) => {
      filteredDb.push(el.id === form.id ? form : el);
    });

    return filteredDb;
  }
}

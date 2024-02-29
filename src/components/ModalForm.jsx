import { useContext, useEffect, useState } from "react";
import "./ModalForm.css";
import DatabaseContext from "../contexts/DatabaseContext";
const initialForm = {
  name: "",
  priority: "",
  section: "",
};
const ModalForm = ({
  isOpen,
  toggleModalForm,
  section,
  dataToEdit,
  setDataToEdit,
}) => {
  const [form, setForm] = useState(initialForm);
  const { createData, editData: updateData } = useContext(DatabaseContext);
  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      section: section,
    });
  };

  const handleSubmit = (e) => {
    // if (!e.target.value) return;
    e.preventDefault();

    if (form.id) {
      updateData(form);
      toggleModalForm();
    } else {
      createData(form);
      toggleModalForm();
    }
    handleReset();
  };
  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };
  return (
    <section className={`form-container ${!isOpen && "closed"}`}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-name">Name</label>
        <input
          type="text"
          id="input-name"
          name="name"
          onChange={handleChange}
          value={form.name}
        />
        <select name="priority" onChange={handleChange} value={form.priority}>
          <option value="---">---</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </section>
  );
};

export default ModalForm;

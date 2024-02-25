import { useState } from "react";
import "./ModalForm.css";
const initialForm = {
  id: "",
  name: "",
  priority: "",
  section: "",
};
const ModalForm = ({ isOpen, toggleModalForm, createData, section, id }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    if (!e.target.value) return;
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      section: section,
      id: id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createData(form);
    setForm(initialForm);
    toggleModalForm();
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

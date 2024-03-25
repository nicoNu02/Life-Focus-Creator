import { useContext, useEffect, useState } from "react";
import "./ModalForm.css";
import DatabaseContext from "../../contexts/DatabaseContext";
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
        <div className="header-modal-task">
          <label htmlFor="input-name">Add task</label>
          <span onClick={toggleModalForm}>X</span>
        </div>
        <input
          type="text"
          id="input-name"
          name="name"
          onChange={handleChange}
          value={form.name}
          className="input-name"
          placeholder="Task name"
          autoFocus
        />
        <textarea
          name="description"
          cols="30"
          rows="5"
          className="text-task"
          placeholder="Description"
        ></textarea>
        <select
          name="priority"
          onChange={handleChange}
          value={form.priority}
          className="modal-select-priority"
        >
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

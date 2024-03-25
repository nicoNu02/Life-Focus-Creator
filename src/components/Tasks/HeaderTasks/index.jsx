// import SelectProject from "../../components/SelectProject";
// import ModalFilters from "../../Notes/Modals/modalFilter/ModalFilters";
import "./styles.css";

export default function HeaderTasks({
  // projects,
  // isOpenModalFilters,
  toggleModal,
}) {
  return (
    <header className="header-tasks">
      {/* <SelectProject projects={projects} /> */}
      <button className="filters-button" onClick={toggleModal}>
        Filters
      </button>
      {/* <ModalFilters isOpenModalFilters={isOpenModalFilters} /> */}
    </header>
  );
}

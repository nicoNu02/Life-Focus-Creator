import { useContext } from "react";
import DatabaseContext from "../../contexts/DatabaseContext";

const ModalOptionsTask = ({
  id,
  isShowing,
  dataToEdit,
  setDataToEdit,
  toggleModalForm,
}) => {
  const { deleteData } = useContext(DatabaseContext);
  return (
    <div className={`modal-options-container ${!isShowing && "closed"}`}>
      <p
        className="editar"
        onClick={() => {
          toggleModalForm();
          setDataToEdit(dataToEdit);
        }}
      >
        Editar
      </p>
      <p className="eliminar" onClick={() => deleteData(id)}>
        Eliminar
      </p>
    </div>
  );
};

export default ModalOptionsTask;

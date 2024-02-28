const ModalOptionsTask = ({
  id,
  isShowing,
  deleteData,
  dataToEdit,
  setDataToEdit,
  toggleModalForm,
}) => {
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

const ModalOptionsTask = ({ id, isShowing }) => {
  return (
    <div className={`modal-options-container ${!isShowing && "closed"}`}>
      <p className="editar">Editar</p>
      <p className="eliminar">Eliminar</p>
    </div>
  );
};

export default ModalOptionsTask;

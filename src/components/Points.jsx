const Points = ({ handleOptionsClick, id }) => {
  return (
    <span className="points" onClick={() => handleOptionsClick(id)}>
      <span className="point"></span>
      <span className="point"></span>
      <span className="point"></span>
    </span>
  );
};

export default Points;

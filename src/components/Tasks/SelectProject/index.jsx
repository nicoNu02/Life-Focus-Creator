import "./styles.css";
export default function SelectProject({ projects }) {
  return (
    <form className="form-select-project">
      <select className="select-project">
        {projects.map((project, i) => {
          return (
            <option value={project.name} key={i}>
              {project.name}
            </option>
          );
        })}
      </select>
    </form>
  );
}

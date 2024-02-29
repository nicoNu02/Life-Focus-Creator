import "./SidebarItem.css";
import { Link } from "react-router-dom";
const SidebarItem = ({ name, iconSrc, className }) => {
  return (
    <div className={className}>
      {/* <img src={iconSrc} alt={`${name} icon`} /> */}
      <Link to={`/${name === "Home" ? "" : name}`}>
        <h2>{name}</h2>
      </Link>
    </div>
  );
};

export default SidebarItem;

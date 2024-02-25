import "./SidebarItem.css";
import { BrowserRouter, Link } from "react-router-dom";
const SidebarItem = ({ name, iconSrc, className = "container" }) => {
  return (
    <div className={className}>
      {/* <img src={iconSrc} alt={`${name} icon`} /> */}
      <Link to={`/${name}`}>
        <h2>{name}</h2>
      </Link>
    </div>
  );
};

export default SidebarItem;

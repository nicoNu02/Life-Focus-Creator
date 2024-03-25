import SidebarItem from "./SidebarItem";
import "./Sidebar.css";
const links = [
  { name: "Home", iconSrc: "" },
  { name: "Tasks", iconSrc: "" },
  { name: "Notes", iconSrc: "" },
  { name: "Timer", iconSrc: "" },
  { name: "Settings", iconSrc: "" },
];
const Sidebar = () => {
  return (
    <nav className="sidebar-container">
      {links.map((el, index) => {
        return (
          <SidebarItem
            key={index}
            name={el.name}
            iconSrc={el.iconSrc}
            className={
              el.name === "Settings" ? "container settings" : "container"
            }
          />
        );
      })}
    </nav>
  );
};

export default Sidebar;

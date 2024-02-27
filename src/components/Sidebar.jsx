import SidebarItem from "./SidebarItem";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar-container">
      <SidebarItem name={"Home"} iconSrc={""} />
      <SidebarItem name={"Tasks"} iconSrc={""} />
      <SidebarItem name={"Notes"} iconSrc={""} />
      <SidebarItem name={"Timer"} iconSrc={""} />
      <SidebarItem
        className="container settings"
        name={"Settings"}
        iconSrc={""}
      />
    </nav>
  );
};

export default Sidebar;

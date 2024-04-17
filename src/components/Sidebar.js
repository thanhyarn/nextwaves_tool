import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <h1 style={{ fontSize: "30px", color: "#ccc" }}>Nextwaves</h1>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/">
            <BsGrid1X2Fill className="icon" /> EPC List
          </a>
        </li>
        {/* <li className="sidebar-list-item">
          <a href="/key">
            <BsFillArchiveFill className="icon" /> Quản lý khóa
          </a>
        </li> */}
        <li className="sidebar-list-item">
          <a href="compare">
            <BsFillGrid3X3GapFill className="icon" /> Compare
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="merge">
            <BsPeopleFill className="icon" /> Merge
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

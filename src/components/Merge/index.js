import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import MergeExcel from "../MergeExcel";
import { Space } from "antd";

const Merge = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <MergeExcel />
      </div>
    </div>
  );
};

export default Merge;

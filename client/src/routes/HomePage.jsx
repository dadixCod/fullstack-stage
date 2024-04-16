import React, { useState } from "react";
import SideBar from "../components/SideBar";
import AgentsComp from "../components/AgentsComp";

const HomePage = ({ setAuth }) => {
  const [content, setContent] = useState(<AgentsComp />);
  const [isNotActive, setIsNotActive] = useState(false);

  const onCrossClicked = (boolean) => {
    setIsNotActive(boolean);
  };

  const handleSidebarItemClick = (newContent) => {
    setContent(newContent);
  };
  return (
    <div className="d-flex">
      <SideBar
        onItemClick={handleSidebarItemClick}
        onCrossClicked={onCrossClicked}
        setAuth={setAuth}
      ></SideBar>
      <div
        className="flex-grow-1 p-3"
        style={{ marginLeft: isNotActive ? "150px" : "250px" }}
      >
        {content}
      </div>
    </div>
  );
};

export default HomePage;

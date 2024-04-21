import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast } from "react-toastify";
import image from "../logo.png";
import "../sidebar.css";
import AgentsComp from "./AgentsComp";
import MaintenanceComp from "./MaintenanceComp";
import EquipementComp from "./EquipementComp";
import AffectationComp from "./AffectationComp";
import StatistiquesComp from "./StatistiquesComp";
import SettingsComp from "./SettingsComp";
import ReformeComp from "./ReformeComp";

const SideBar = ({ onItemClick, onCrossClicked, setAuth }) => {
  const [isNotActive, setNotActive] = useState(false);
  const [activeItem, setActiveItem] = useState(<AgentsComp />);
  var barsIcon = <i className="fas fa-bars"></i>;
  var crossIcon = <i className="fas fa-times-circle"></i>;

  const crossClicked = () => {
    setNotActive(!isNotActive);
    onCrossClicked(!isNotActive);
  };

  const handleItemClick = (itemText) => {
    onItemClick(itemText);
    setActiveItem(itemText);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully!");
  };

  return (
    <div>
      <div className="wrapper">
        <nav id="sidebar" className={isNotActive ? "active" : ""}>
          <button
            type="button"
            id="sidebarCollapse"
            onClick={() => crossClicked()}
            className="btn btn-custom"
          >
            <span className={isNotActive ? "" : "hidden"}>{barsIcon}</span>
            <span className={isNotActive ? "hidden" : ""}>{crossIcon}</span>
          </button>
          <div className="sidebar-header">
            <img
              src={image}
              height={isNotActive ? "0" : "50"}
              width={isNotActive ? "0" : "160"}
            ></img>
            <h3></h3>
          </div>

          <ul className="list-unstyled components">
            <ListItem
              text="Agents"
              icon="bi bi-people-fill"
              component={<AgentsComp />}
              onItemClick={handleItemClick}
              isActive={activeItem === "Users"}
            />
            <ListItem
              text="Equipements"
              icon="bi bi-pc-display"
              component={<EquipementComp />}
              onItemClick={handleItemClick}
              isActive={activeItem === "Equipements"}
            />
            <ListItem
              text="Statistiques"
              icon="bi bi-graph-up"
              component={<StatistiquesComp />}
              onItemClick={handleItemClick}
              isActive={activeItem === "Statistiques"}
            />
            <ListItem
              text="Maintenance"
              icon="bi bi-tools"
              component={<MaintenanceComp />}
              onItemClick={handleItemClick}
              isActive={activeItem === "Maintenance"}
            />
            <ListItem
              text="Affectation"
              icon="bi bi-person-check"
              component={<AffectationComp />}
              onItemClick={handleItemClick}
              isActive={activeItem === "Affectation"}
            />
            <ListItem
              text="Reforme"
              icon="bi bi-box"
              component={<ReformeComp />}
              onItemClick={handleItemClick}
              isActive={activeItem === "Reforme"}
            />
            <ListItem
              text="Paramètres"
              icon="bi bi-gear-fill"
              component={<SettingsComp />}
              onItemClick={handleItemClick}
              isActive={activeItem === "Paramètres"}
            />
            <hr className="sidebar-divider " />
            <ListItem
              text="Logout"
              icon="bi bi-box-arrow-right"
              onItemClick={handleLogout}
              isActive={activeItem === ""}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};

const ListItem = ({ text, icon, component, onItemClick, isActive }) => {
  return (
    <li className="list-item">
      <div
        className={`item-container ${isActive ? "active" : ""}`}
        onClick={() => onItemClick(component)}
      >
        <i className={`${icon} icon-color`}></i>
        <NavLink>{text}</NavLink>
      </div>
    </li>
  );
};

export default SideBar;

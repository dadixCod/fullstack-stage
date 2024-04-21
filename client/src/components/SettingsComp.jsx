import React from "react";
import TypesRow from "./TypesRow";

import ServicesRow from "./ServicesRow";
import SousDirectionsRow from "./SousDirectionsRow";
import BureauxRow from "./BureauxRow";

const SettingsComp = () => {
  return (
    <div>
      <h1 className="text-center mb-1">Paramètres</h1>
      <TypesRow></TypesRow>
      <ServicesRow></ServicesRow>
      <SousDirectionsRow></SousDirectionsRow>
      <BureauxRow></BureauxRow>
    </div>
  );
};

export default SettingsComp;

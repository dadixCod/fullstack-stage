import React from "react";
import TypesRow from "./TypesRow";

import ServicesRow from "./ServicesRow";
import SousDirectionsRow from "./SousDirectionsRow";

const SettingsComp = () => {
  return (
    <div>
      <h1 className="text-center mb-1">Paramètres</h1>
      <TypesRow></TypesRow>
      <ServicesRow></ServicesRow>
      <SousDirectionsRow ></SousDirectionsRow>
    </div>
  );
};

export default SettingsComp;

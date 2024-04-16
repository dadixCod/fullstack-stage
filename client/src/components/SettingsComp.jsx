import React from "react";
import TypesRow from "./TypesRow";
import AddTypeForm from "./AddTypeForm";
import DeleteType from "./DeleteType";
import ServicesRow from "./ServicesRow";
import AddServiceForm from "./AddServiceForm";
import SousDirectionsRow from "./SousDirectionsRow";

const SettingsComp = () => {
  return (
    <div>
      <h1 className="text-center mb-1">Paramètres</h1>
      <TypesRow></TypesRow>
      <AddTypeForm />
      <DeleteType />
      <ServicesRow></ServicesRow>
      <AddServiceForm />
      <SousDirectionsRow />
    </div>
  );
};

export default SettingsComp;

import React from "react";
import TypesRow from "./TypesRow";
import AddTypeForm from "./AddTypeForm";
import DeleteType from "./DeleteType";
import ServicesRow from "./ServicesRow";
import AddServiceForm from "./AddServiceForm";
import SousDirectionsRow from "./SousDirectionsRow";
import EditType from "./EditTypeForm";
import UpdateServiceForm from "./UpdateServiceForm";
import DeleteService from "./DeleteService";
import AddSousDirectionForm from "./AddSousDirectionForm";
import UpdateSousDirectionForm from "./UpdateSousDirectionForm";
import DeleteSousDirectionForm from "./DeleteSousDirectionForm";

const SettingsComp = () => {
  return (
    <div>
      <h1 className="text-center mb-1">Paramètres</h1>
      <TypesRow></TypesRow>
      <AddTypeForm />
      <EditType />
      <DeleteType />
      <ServicesRow></ServicesRow>
      <AddServiceForm />
      <UpdateServiceForm />
      <DeleteService />
      <SousDirectionsRow />
      <AddSousDirectionForm />
      <UpdateSousDirectionForm />
      <DeleteSousDirectionForm />
    </div>
  );
};

export default SettingsComp;

import React from "react";
import AddEquipementForm from "./AddEquipementForm";
import EquipementsList from "./EquipementsList";


const EquipementComp = () => {
  return (
    <div>
      <h1 className="text-center">Equipements</h1>
      <AddEquipementForm />
     
      <EquipementsList />
    </div>
  );
};

export default EquipementComp;

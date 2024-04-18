import React, { useEffect, useState } from "react";
import AffectationOperationRow from "./AffectationOperationRow";
import moment from "moment";

const AffectationComp = () => {
  const [affectations, setAffectations] = useState([]);
  async function fetchAffectations() {
    try {
      const response = await fetch("http://localhost:4000/affectation", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const parseData = await response.json();
      setAffectations(parseData);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchAffectations();
  }, [affectations]);
  return (
    <div>
      <h1 className="text-center mt-2"> Affectation</h1>
      <AffectationOperationRow />

      <table className="table table-hover table-dark mt-5">
        <thead>
          <tr className="table-primary">
            <th scope="col">Numéro d'affectation</th>
            <th scope="col">Numero d'inventaire</th>
            <th scope="col">SN</th>
            <th scope="col">Modèle</th>
            <th scope="col">Type</th>
            <th scope="col">Agent</th>
            <th scope="col">Date d'affectation</th>
            <th scope="col">Imprimer</th>
            <th scope="col">Editer</th>
            <th scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {affectations &&
            affectations.map((affectation) => {
              return (
                <tr key={affectation.num_affectation}>
                  <td scope="col" style={{ width: "100px" }}>
                    {affectation.num_affectation}
                  </td>
                  <td scope="col" style={{ width: "100px" }}>
                    {affectation.num_inventaire}
                  </td>
                  <td scope="col">{affectation.sn}</td>
                  <td scope="col">{affectation.modele}</td>
                  <td scope="col">{affectation.type}</td>
                  <td scope="col">{`${affectation.nom} ${affectation.prenom}`}</td>
                  <td scope="col">
                    {moment(affectation.dateaffectation).format("YYYY-MM-DD")}
                  </td>
                  <td>
                    <button type="button" className="btn btn-info">
                      <i className="bi bi-printer-fill"></i>
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-warning">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger">
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AffectationComp;

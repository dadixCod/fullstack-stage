import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AffectationOperationRow from "./AffectationOperationRow";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import PrintableComponent from "./PrintableComponent";
import { toast } from "react-toastify";

const AffectationComp = () => {
  let navigate = useNavigate();
  const [affectations, setAffectations] = useState([]);
  const [selectedAffectation, setSelectedAffectation] = useState(null);

  // Function to handle row selection
  const handleRowSelect = (affectation) => {
    setSelectedAffectation(affectation);
    console.log(affectation);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Affectation Document",
    onAfterPrint: () => setSelectedAffectation(null),
  });
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
  const handleEditClick = (e, id) => {
    e.stopPropagation();
    navigate(`/affectations/details/${id}`);
  };
  const handleDeleteClick = async (e, num_affectation, num_inventaire) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette affectation ?"
    );
    if (!confirmDelete) {
      return;
    }
    const body = { num_inventaire };
    try {
      const response = await fetch(
        `http://localhost:4000/affectation/delete/${num_affectation}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseData = await response.json();
      setAffectations(
        affectations.filter((affectation) => {
          return affectation.num_affectation !== num_affectation;
        })
      );
      toast.success(parseData.message);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchAffectations();
  }, []);
  return (
    <div>
      <h1 className="text-center mt-2"> Affectation</h1>
      <AffectationOperationRow fetchAffectations={fetchAffectations} />

      <table className="table table-hover table-dark mt-5">
        <thead>
          <tr className="table-primary">
            <th scope="col">N° d'affectation</th>
            <th scope="col">N° d'inventaire</th>
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
                <tr
                  onClick={(e) => handleRowSelect(affectation)}
                  key={affectation.num_affectation}
                >
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
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={handlePrint}
                    >
                      <i className="bi bi-printer-fill"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={(e) =>
                        handleEditClick(e, affectation.num_affectation)
                      }
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(e) =>
                        handleDeleteClick(
                          e,
                          affectation.num_affectation,
                          affectation.num_inventaire
                        )
                      }
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {selectedAffectation === null ? (
        <></>
      ) : (
        <div style={{ opacity: 0 }} className="card">
          <PrintableComponent ref={componentRef} data={selectedAffectation} />
        </div>
      )}
    </div>
  );
};

export default AffectationComp;

import React, { useCallback, useEffect, useState } from "react";
import AddBureauForm from "./AddBureauForm";
import EditBureauForm from "./EditBureauForm";
import DeleteBureau from "./DeleteBureau";

const BureauxRow = () => {
  const [bureaux, setBureaux] = useState([]);
  const [selectedBureaux, setSelectedBureaux] = useState("Voir les Bureaux");
  async function fetchBureaux() {
    try {
      const response = await fetch(`http://localhost:4000/bureaux`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const parseDate = await response.json();
      setBureaux(parseDate);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchBureaux();
  }, []);

  return (
    <div className="card text-bg-light mb-4">
      <AddBureauForm fetchBureaux={fetchBureaux} />
      <EditBureauForm bureaux={bureaux} fetchBureaux={fetchBureaux} />
      <DeleteBureau bureaux={bureaux} fetchBureaux={fetchBureaux} />

      <div className=" mx-4 mt-4">
        <span className="text-start fs-2 fw-medium">Bureaux</span>
      </div>
      <div className="d-flex justify-content-between align-items-center mx-4 mt-3 mb-5">
        <div className="col">
          <select value={selectedBureaux} className="form-select">
            <option disabled>Voir les Bureaux</option>
            {bureaux &&
              bureaux.map((bureau) => {
                return (
                  <option key={bureau.id_bureau} value={bureau.id_bureau}>
                    {bureau.bureau}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-success col-auto"
            data-bs-toggle="modal"
            data-bs-target="#addBureauForm"
          >
            Ajouter un Bureau
          </button>
        </div>
        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-warning col-auto"
            data-bs-toggle="modal"
            data-bs-target="#editBureauForm"
          >
            Modifier un Bureau
          </button>
        </div>
        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-danger col-auto"
            data-bs-toggle="modal"
            data-bs-target="#deleteBureauForm"
          >
            Supprimer un bureau
          </button>
        </div>
      </div>
      {/* <hr className="bordeer border-dark border-2" /> */}
    </div>
  );
};

export default BureauxRow;

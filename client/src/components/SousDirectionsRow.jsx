import React, { useEffect, useState } from "react";
import AddSousDirectionForm from "./AddSousDirectionForm";
import UpdateSousDirectionForm from "./UpdateSousDirectionForm";
import DeleteSousDirectionForm from "./DeleteSousDirectionForm";

const SousDirectionsRow = () => {
  const [sousDirections, setSousDirections] = useState([]);
  const [selectedSousDirection, setSelectedSousDirection] = useState(
    "Voir les Sous Directions"
  );
  async function fetchSousDirections() {
    try {
      const response = await fetch(`http://localhost:4000/sousdirections`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const parseDate = await response.json();
      setSousDirections(parseDate);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchSousDirections();
  }, []);

  return (
    <div className="card text-bg-light">
      <AddSousDirectionForm fetchSousDirections={fetchSousDirections} />
      <UpdateSousDirectionForm
        fetchSousDirections={fetchSousDirections}
        sousdirections={sousDirections}
      />
      <DeleteSousDirectionForm
        fetchSousDirections={fetchSousDirections}
        sousdirections={sousDirections}
      />
      <div className=" mx-4 mt-4">
        <span className="text-start fs-2 fw-medium">Sous Directions</span>
      </div>
      <div className="d-flex justify-content-between align-items-center mx-4 mt-3 mb-5">
        <div className="col">
          <select value={selectedSousDirection} className="form-select">
            <option disabled>Voir les Sous Directions</option>
            {sousDirections &&
              sousDirections.map((sousdirection) => {
                return (
                  <option
                    key={sousdirection.id_sousdirection}
                    value={sousdirection.id_sousdirection}
                  >
                    {sousdirection.sousdirection}
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
            data-bs-target="#addSousDirectionForm"
          >
            Ajouter une Sous Direction
          </button>
        </div>
        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-warning col-auto"
            data-bs-toggle="modal"
            data-bs-target="#updateSousDirectionForm"
          >
            Modifier une Sous Direction
          </button>
        </div>
        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-danger col-auto"
            data-bs-toggle="modal"
            data-bs-target="#deleteSousDirectionForm"
          >
            Supprimer une Sous Direction
          </button>
        </div>
      </div>
      {/* <hr className="bordeer border-dark border-2" /> */}
    </div>
  );
};

export default SousDirectionsRow;

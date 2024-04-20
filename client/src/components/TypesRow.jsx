import React, { useCallback, useEffect, useState } from "react";

const TypesRow = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("Voir les types");
  async function fetchTypes() {
    try {
      const response = await fetch(`http://localhost:4000/types`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const parseDate = await response.json();
      setTypes(parseDate);
    } catch (error) {
      console.error(error.message);
    }
  }
  useCallback(() => {
    fetchTypes();
  }, [types]);

  return (
    <div className="card text-bg-light">
      <div className=" mx-4 mt-4">
        <span className="text-start fs-2 fw-medium">Types</span>
      </div>
      <div className="d-flex justify-content-between align-items-center mx-4 mt-3 mb-5">
        <div className="col">
          <select value={selectedType} className="form-select">
            <option disabled>Voir les types</option>
            {types &&
              types.map((type) => {
                return (
                  <option key={type.id_type} value={type.id_type}>
                    {type.type}
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
            data-bs-target="#addTypeForm"
          >
            Ajouter un Type
          </button>
        </div>
        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-warning col-auto"
            data-bs-toggle="modal"
            data-bs-target="#editTypeForm"
          >
            Modifier un Type
          </button>
        </div>
        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-danger col-auto"
            data-bs-toggle="modal"
            data-bs-target="#deleType"
          >
            Supprimer un Type
          </button>
        </div>
      </div>
      {/* <hr className="bordeer border-dark border-2" /> */}
    </div>
  );
};

export default TypesRow;

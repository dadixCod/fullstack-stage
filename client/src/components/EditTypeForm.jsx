import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditType = () => {
  const [id_type, setIdType] = useState("Type");
  const [newType, setNewType] = useState("");
  const [types, setTypes] = useState([]);

  async function editType(newType) {
    try {
      const body = { type: newType };
      const response = await fetch(
        `http://localhost:4000/types/update/${id_type}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseData = await response.json();
      if (parseData.updated) {
        toast.success(parseData.message);
        setNewType("");
        setIdType("Type");
      } else {
        toast.error(parseData);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
  useEffect(() => {
    fetchTypes();
  }, []);
  return (
    <div className=" d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="editTypeForm"
        tabIndex="-1"
        aria-labelledby="editTypeFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editTypeForm">
                Editer un type
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="mx-3">
                <div className="row my-3">
                  <div className="col">
                    <div className="form-group">
                      <label className="mb-2" htmlFor="modele">
                        Type
                      </label>
                      <select
                        className="form-select"
                        value={id_type}
                        onChange={(e) => setIdType(e.target.value)}
                      >
                        <option disabled>Type</option>
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
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col">
                    <div className="form-group">
                      <label className="mb-2" htmlFor="modele">
                        Nouveau Type
                      </label>
                      <input
                        value={newType}
                        className="form-control"
                        type="text"
                        onChange={(e) => setNewType(e.target.value)}
                        placeholder="Nouveau Type"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                onClick={(e) => editType(newType)}
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-warning"
              >
                Editer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditType;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DeleteSousDirectionForm = () => {
  const [selectedSousdirection, setSelectedSousDirection] =
    useState("Sous Direction");
  const [sousdirections, setSousDirections] = useState([]);
  async function deletSousDirection() {
    try {
      const response = await fetch(
        `http://localhost:4000/sousdirections/delete/${selectedSousdirection}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
        }
      );
      const parseData = await response.json();
      toast.success(parseData.message);
      setSelectedSousDirection("Sous Direction");
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchSousDirections() {
    try {
      const response = await fetch("http://localhost:4000/sousdirections", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const parseData = await response.json();
      setSousDirections(parseData);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchSousDirections();
  }, []);
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="deleteSousDirectionForm"
        tabIndex="-1"
        aria-labelledby="deleteSousDirectionFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteSousDirectionForm">
                Supprimer une Sous Direction
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
                        Sous Direction
                      </label>
                      <select
                        className="form-select"
                        value={selectedSousdirection}
                        onChange={(e) =>
                          setSelectedSousDirection(e.target.value)
                        }
                      >
                        <option disabled>Sous Direction</option>
                        {sousdirections &&
                          sousdirections.map((sousdirection) => {
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
                onClick={(e) => deletSousDirection()}
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSousDirectionForm;

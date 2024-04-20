import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateSousDirectionForm = ({ fetchSousDirections, sousdirections }) => {
  const [id_sousdirection, setIdSousDirection] = useState("Sous Direction");
  const [newSousDirection, setNewSousDirection] = useState("");

  async function editSousDirection() {
    try {
      const body = { sousdirection: newSousDirection };
      const response = await fetch(
        `http://localhost:4000/sousdirections/update/${id_sousdirection}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseData = await response.json();
      if (parseData.updated) {
        fetchSousDirections();
        toast.success(parseData.message);
        setNewSousDirection("");
        setIdSousDirection("Sous Direction");
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSousDirections();
  }, []);
  return (
    <div className=" d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="updateSousDirectionForm"
        tabIndex="-1"
        aria-labelledby="updateSousDirectionFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateSousDirectionForm">
                Editer une Sous Direction
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
                        value={id_sousdirection}
                        onChange={(e) => setIdSousDirection(e.target.value)}
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
                <div className="row my-3">
                  <div className="col">
                    <div className="form-group">
                      <label className="mb-2" htmlFor="modele">
                        Nouvelle Sous Direction
                      </label>
                      <input
                        value={newSousDirection}
                        className="form-control"
                        type="text"
                        onChange={(e) => setNewSousDirection(e.target.value)}
                        placeholder="Sous Direction"
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
                onClick={(e) => editSousDirection()}
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

export default UpdateSousDirectionForm;

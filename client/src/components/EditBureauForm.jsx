import React, { useState } from "react";
import { toast } from "react-toastify";

const EditBureauForm = ({ bureaux, fetchBureaux }) => {
  const [id_bureau, setIdBureau] = useState("Bureau");
  const [newBureau, setNewBureau] = useState("");

  async function editBureau(newBureau) {
    try {
      const body = { bureau: newBureau };
      const response = await fetch(
        `http://localhost:4000/bureaux/update/${id_bureau}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseData = await response.json();
      if (parseData.updated) {
        toast.success(parseData.message);
        fetchBureaux();
        setNewBureau("");
        setIdBureau("Bureau");
      } else {
        toast.error(parseData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className=" d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="editBureauForm"
        tabIndex="-1"
        aria-labelledby="editBureauFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editBureauForm">
                Modifier un bureau
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
                      <label className="mb-2" htmlFor="bureau">
                        Bureau
                      </label>
                      <select
                        className="form-select"
                        value={id_bureau}
                        onChange={(e) => setIdBureau(e.target.value)}
                      >
                        <option disabled>Bureau</option>
                        {bureaux &&
                          bureaux.map((bureau) => {
                            return (
                              <option
                                key={bureau.id_bureau}
                                value={bureau.id_bureau}
                              >
                                {bureau.bureau}
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
                        Nouveau Bureau
                      </label>
                      <input
                        value={newBureau}
                        className="form-control"
                        type="text"
                        onChange={(e) => setNewBureau(e.target.value)}
                        placeholder="Nouveau Bureau"
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
                onClick={(e) => editBureau(newBureau)}
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

export default EditBureauForm;

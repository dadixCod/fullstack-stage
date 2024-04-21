import React, { useState } from "react";
import { toast } from "react-toastify";

const DeleteBureau = ({ bureaux, fetchBureaux }) => {
  const [bureau, setBureau] = useState("Bureau");

  async function deleteBureau(id) {
    try {
      const response = await fetch(
        `http://localhost:4000/bureaux/delete/${id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
        }
      );
      fetchBureaux();
      const parseData = await response.json();
      toast.success(parseData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="deleteBureauForm"
        tabIndex="-1"
        aria-labelledby="deleteBureauFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteBureauForm">
                Supprimer un bureau
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
                        Bureau
                      </label>
                      <select
                        className="form-select"
                        value={bureau}
                        onChange={(e) => setBureau(e.target.value)}
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
                onClick={(e) => deleteBureau(bureau)}
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

export default DeleteBureau;

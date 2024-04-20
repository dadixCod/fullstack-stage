import React, { useState } from "react";
import { toast } from "react-toastify";

const AddSousDirectionForm = () => {
  const [sousdirection, setSousDirection] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        sousdirection,
      };
      const response = await fetch(`http://localhost:4000/sousdirections/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseData = await response.json();
      if (parseData.newSousDirection) {
        toast.success(parseData.message);
        setSousDirection("");
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="mb-4 d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="addSousDirectionForm"
        tabIndex="-1"
        aria-labelledby="addSousDirectionFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addSousDirectionForm">
                Ajouter une Sous Direction
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
                      <label htmlFor="sousdirection">Sous Direction</label>
                      <input
                        className="form-control"
                        value={sousdirection}
                        onChange={(e) => setSousDirection(e.target.value)}
                        type="text"
                        name="sousdirection"
                        id="sousdirection"
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
                onClick={onSubmitForm}
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-primary"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSousDirectionForm;

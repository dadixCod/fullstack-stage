import React, { useState } from "react";
import { toast } from "react-toastify";

const AddBureauForm = () => {
  const [bureau, setBureau] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        bureau,
      };
      const response = await fetch(`http://localhost:4000/bureaux/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseData = await response.json();
      if (parseData.newBureau) {
        toast.success(parseData.message);
        setBureau("");
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
        id="addBureauForm"
        tabIndex="-1"
        aria-labelledby="addBureauFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addBureauForm">
                Ajouter un bureau
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
                      <label htmlFor="bureau">Bureau</label>
                      <input
                        className="form-control"
                        value={bureau}
                        onChange={(e) => setBureau(e.target.value)}
                        type="text"
                        name="bureau"
                        id="bureau"
                        placeholder="Bureau"
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

export default AddBureauForm;

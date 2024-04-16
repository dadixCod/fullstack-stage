import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DeleteType = () => {
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        type,
      };
      const response = await fetch(`http://localhost:4000/types/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseData = await response.json();
      if (parseData.newType) {
        toast.success(parseData.message);
        setType("");
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  async function deleteType(id) {
    try {
      const response = await fetch(`http://localhost:4000/types/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });
      const parseData = await response.json();
      toast.success(parseData.message);
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
  }, [types]);
  return (
    <div className="mb-4 d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="deleType"
        tabIndex="-1"
        aria-labelledby="deleTypeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleType">
                Supprimer un type
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
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
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
                onClick={(e) => deleteType(type)}
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

export default DeleteType;

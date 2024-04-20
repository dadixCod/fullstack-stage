import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddServiceForm = ({ fetchServices }) => {
  const [service, setService] = useState("");
  const [selectedSousDirection, setSelectedSousdirection] =
    useState("Sous Directions");
  const [sousdirections, setSousdirections] = useState([]);

  async function fetchSousDirections() {
    try {
      const response = await fetch("http://localhost:4000/sousdirections", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const parseData = await response.json();
      setSousdirections(parseData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        service,
        id_sousdirection: selectedSousDirection,
      };
      const response = await fetch(`http://localhost:4000/services/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseData = await response.json();
      if (parseData.newService) {
        fetchServices();
        toast.success(parseData.message);
        setSelectedSousdirection("Sous Directions");
        setService("");
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchSousDirections();
  }, []);
  return (
    <div className="mb-4 d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="addServiceForm"
        tabIndex="-1"
        aria-labelledby="addServiceFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addServiceForm">
                Ajouter un service
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
                        value={selectedSousDirection}
                        onChange={(e) =>
                          setSelectedSousdirection(e.target.value)
                        }
                        className="form-select"
                      >
                        <option disabled>Sous Directions</option>
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
                  <div className="col">
                    <div className="form-group">
                      <label className="mb-2" htmlFor="modele">
                        Service
                      </label>
                      <input
                        className="form-control"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        type="text"
                        name="service"
                        id="service"
                        placeholder="Service"
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

export default AddServiceForm;

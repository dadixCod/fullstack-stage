import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DeleteService = () => {
  const [selectedService, setSelectedService] = useState("Service");
  const [services, setServices] = useState("");

  async function deleteService() {
    try {
      const response = await fetch(
        `http://localhost:4000/services/delete/${selectedService}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
        }
      );
      const parseData = await response.json();
      toast.success(parseData.message);
      setSelectedService("Service");
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchServices() {
    try {
      const response = await fetch("http://localhost:4000/services", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const parseData = await response.json();
      setServices(parseData);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="deletServiceForm"
        tabIndex="-1"
        aria-labelledby="deletServiceFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deletServiceForm">
                Supprimer un service
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
                        Service
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="form-select"
                        name=""
                        id=""
                      >
                        <option disabled>Service</option>
                        {services &&
                          services.map((service) => {
                            return (
                              <option
                                key={service.id_service}
                                value={service.id_service}
                              >
                                {service.service}
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
                onClick={(e) => deleteService(selectedService)}
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

export default DeleteService;

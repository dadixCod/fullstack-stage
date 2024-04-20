import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateServiceForm = ({ fetchServices, services }) => {
  const [selectedService, setSelectedService] = useState("Service");

  const [newService, setNewService] = useState("");
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

  const onServiceSelected = (id_service, id_sousdirection) => {
    setSelectedService(id_service);
    setSelectedSousdirection(id_sousdirection);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        newService: newService,
        id_sousdirection: selectedSousDirection,
      };
      const response = await fetch(
        `http://localhost:4000/services/update/${selectedService}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseData = await response.json();
      if (parseData.updated) {
        fetchServices();
        toast.success(parseData.message);
        setSelectedService("Service");
        setNewService("");
        setSelectedSousdirection("Sous Directions");
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchServices();
    fetchSousDirections();
  }, []);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="updateServiceForm"
        tabIndex="-1"
        aria-labelledby="updateServiceFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateServiceForm">
                Modifier un service
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
                        onChange={(e) => {
                          const selectedOption =
                            e.target.options[e.target.selectedIndex];
                          const idService =
                            selectedOption.getAttribute("data-id-service");
                          const idSousDirection = selectedOption.getAttribute(
                            "data-id-sousdirection"
                          );
                          onServiceSelected(idService, idSousDirection);
                        }}
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
                                data-id-service={service.id_service}
                                data-id-sousdirection={service.id_sousdirection}
                              >
                                {service.service}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
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
                </div>
                <div className="row my-3">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="newService">Nouveau Service</label>
                      <input
                        className="form-control"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        type="text"
                        placeholder="Optionnel(Nouveau Service)"
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
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateServiceForm;

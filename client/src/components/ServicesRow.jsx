import React, { useEffect, useState } from "react";

const ServicesRow = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("Voir les Services");
  async function fetchServices() {
    try {
      const response = await fetch(`http://localhost:4000/services`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const parseDate = await response.json();
      setServices(parseDate);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchServices();
  }, [services]);

  return (
    <div className="card text-bg-light">
        <div className=" mx-4 mt-4">

      <span className="text-start fs-2 fw-medium">Services</span>
        </div>
      <div className="d-flex justify-content-between align-items-center mx-4 mt-3 mb-5">
        <div className="col">
          <select value={selectedService} className="form-select">
            <option disabled>Voir les Services</option>
            {services &&
              services.map((service) => {
                return (
                  <option key={service.id_service} value={service.id_service}>
                    {service.service}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-success col-auto"
            data-bs-toggle="modal"
            data-bs-target="#addServiceForm"
          >
            Ajouter un service
          </button>
        </div>
        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-warning col-auto"
            data-bs-toggle="modal"
            data-bs-target="#deleType"
          >
            Modifier un Service
          </button>
        </div>
        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-danger col-auto"
            data-bs-toggle="modal"
            data-bs-target="#deleType"
          >
            Supprimer un Service
          </button>
        </div>
      </div>
      {/* <hr className="bordeer border-dark border-2" /> */}
    </div>
  );
};

export default ServicesRow;

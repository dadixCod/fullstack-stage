import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AddAgentForm = () => {
  const [directions, setDirections] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedSousdirection, setSelectedSousdirection] = useState("");
  const [bureuax, setBureaux] = useState([]);
  const [selectedBureau, setSelectedBureau] = useState("Bureau");
  const [addBureauClicked, setAddBureauClicked] = useState(false);
  const [bureau, setBureau] = useState("");
  const onBureauAddClicked = async (e) => {
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
        setAddBureauClicked(false);
        setBureau("");
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  async function fetchBureaux() {
    try {
      const response = await fetch("http://localhost:4000/bureaux", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const parseData = await response.json();
      setBureaux(parseData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const [inputs, setInputs] = useState({
    nom: "",
    prenom: "",
    fonction: "",
    id_sousdirection: "",
    id_service: "Services",
    id_bureau: "",
  });
  const { nom, prenom, fonction, id_service } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  async function fetchDirections() {
    try {
      const response = await fetch("http://localhost:4000/sousdirections", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const sousdirections = await response.json();
      setDirections(sousdirections);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function fetchEquipements() {
    try {
      const response = await fetch("http://localhost:4000/equipements", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const equipements = await response.json();
    } catch (error) {
      console.error(error.message);
    }
  }
  async function fetchSubServices(id) {
    try {
      const response = await fetch(
        `http://localhost:4000/services/sousdirection/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const services = await response.json();

      setServices(services);
    } catch (error) {
      console.error(error.message);
    }
  }
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        nom,
        prenom,
        fonction,
        id_sousdirection: selectedSousdirection,
        id_service,
        id_bureau: selectedBureau,
      };
      const response = await fetch(`http://localhost:4000/agents/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseData = await response.json();
      if (parseData) {
        toast.success(parseData.message);
        setInputs({
          nom: "",
          prenom: "",
          fonction: "",
          id_sousdirection: "",
          id_service: "Services",
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDirections();
    fetchEquipements();
  }, []);
  useEffect(() => {
    fetchBureaux();
  }, [bureuax]);
  useEffect(() => {}, [selectedSousdirection]);
  useEffect(() => {
    fetchSubServices(selectedSousdirection);
  }, [selectedSousdirection]);
  return (
    <div className="mb-4 d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="addAgentModal"
        // data-bs-backdrop="static"
        // data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="addAgentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ width: "600px" }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addAgentModalLabel">
                Ajouter un agent
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
                      <label htmlFor="nom">Nom</label>
                      <input
                        className="form-control"
                        value={nom}
                        onChange={(e) => onChange(e)}
                        type="text"
                        name="nom"
                        id="nom"
                        placeholder="Nom"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="prenom">Prenom</label>
                      <input
                        className="form-control"
                        value={prenom}
                        onChange={(e) => onChange(e)}
                        type="text"
                        name="prenom"
                        id="prenom"
                        placeholder="Prenom"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="sousdirection">Sous direction</label>
                      <select
                        value={selectedSousdirection}
                        onChange={(e) =>
                          setSelectedSousdirection(e.target.value)
                        }
                        className="form-select"
                        name="id_sousdirection"
                      >
                        <option disabled>Sous directions</option>
                        {directions &&
                          directions.map((direction) => {
                            return (
                              <option
                                key={direction.id_sousdirection}
                                value={direction.id_sousdirection}
                              >
                                {direction.sousdirection}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="service">Service</label>
                      <select
                        value={id_service}
                        onChange={(e) => onChange(e)}
                        name="id_service"
                        className="form-select"
                      >
                        <option disabled>Services</option>
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
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="fonction">Fonction</label>
                      <input
                        className="form-control"
                        value={fonction}
                        onChange={(e) => onChange(e)}
                        type="text"
                        name="fonction"
                        id="fonction"
                        placeholder="Fonction"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="fonction">Bureau</label>
                      <div className="d-flex align-items-center">
                        <select
                          className="form-select"
                          value={selectedBureau}
                          onChange={(e) => setSelectedBureau(e.target.value)}
                        >
                          <option disabled>Bureau</option>
                          {bureuax &&
                            bureuax.map((bureau) => {
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
                        <button
                          type="button"
                          onClick={(e) => setAddBureauClicked(true)}
                          className="btn btn-primary ms-2"
                        >
                          <span className="fw-bold">+</span>
                        </button>
                      </div>
                      {addBureauClicked ? (
                        <div className="form-group mt-2">
                          <div className="d-flex align-items-center">
                            <input
                              value={bureau}
                              onChange={(e) => setBureau(e.target.value)}
                              className="form-control"
                              type="text"
                              placeholder="Ajouter un bureau"
                            />
                            <button
                              onClick={(e) => onBureauAddClicked(e)}
                              className="btn btn-success ms-2"
                            >
                              <i className="bi bi-check2-all"></i>
                            </button>
                            <button
                              onClick={(e) => setAddBureauClicked(false)}
                              className="btn btn-danger ms-2"
                            >
                              <i class="bi bi-x"></i>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
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

export default AddAgentForm;

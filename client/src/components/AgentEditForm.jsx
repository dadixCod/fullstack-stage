import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AgentEditForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [directions, setDirections] = useState([]);
  const [services, setServices] = useState([]);
  const [equipements, setEquipements] = useState([]);
  const [selectedSousdirection, setSelectedSousdirection] = useState("");
  const [inputs, setInputs] = useState({
    nom: "",
    prenom: "",
    fonction: "",
    id_sousdirection: "",
    id_service: "",
    id_equipement: "",
  });
  const { nom, prenom, fonction, id_sousdirection, id_service, id_equipement } =
    inputs;
  async function fetchUser() {
    try {
      const response = await fetch(`http://localhost:4000/agents/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const agent = await response.json();
      setInputs({
        nom: agent.nom,
        prenom: agent.prenom,
        fonction: agent.fonction,
        id_sousdirection: agent.id_sousdirection,
        id_service: agent.id_service,
        
      });
      setSelectedSousdirection(agent.id_sousdirection);
    } catch (error) {
      console.error(error.message);
    }
  }
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
      setEquipements(equipements);
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
      
      };
      const response = await fetch(
        `http://localhost:4000/agents/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseData = await response.json();
      if (parseData) {
        navigate("/");
        toast.success(parseData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchDirections();

    fetchEquipements();
  }, []);
  useEffect(() => {}, [selectedSousdirection]);
  useEffect(() => {
    fetchSubServices(selectedSousdirection);
  }, [selectedSousdirection]);

  return (
    <div className="card mx-auto my-4 shadow" style={{ width: 600 }}>
      <form onSubmit={onSubmitForm} className="mx-3">
        <div className="row my-3">
          <div className="col">
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                value={nom}
                onChange={(e) => onChange(e)}
                className="form-control"
                type="text"
                name="nom"
                id="nom"
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="prenom">Prenom</label>
              <input
                value={prenom}
                onChange={(e) => onChange(e)}
                className="form-control"
                type="text"
                name="prenom"
                id="prenom"
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="form-group">
              <label htmlFor="sousdirection">Sous direction</label>
              <select
                className="form-select"
                name="id_sousdirection"
                value={selectedSousdirection}
                onChange={(e) => setSelectedSousdirection(e.target.value)}
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
                name="id_service"
                className="form-select"
                value={id_service}
                onChange={(e) => onChange(e)}
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
                value={fonction}
                onChange={(e) => onChange(e)}
                className="form-control"
                type="text"
                name="fonction"
                id="fonction"
              />
            </div>
          </div>
          
        </div>

        <div className="d-grid my-4">
          <button type="submit" className="btn btn-primary">
            Editer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentEditForm;

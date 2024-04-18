import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddTypeForm from "./AddTypeForm";

const EquipementEditForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEtat, setSelectedEtat] = useState("Etat");
  const [etats, setEtats] = useState([]);

  const [selectedType, setSelectedType] = useState("Type");
  const [types, setTypes] = useState([]);
  const [inputs, setInputs] = useState({
    modele: "",
    id_type: "",
    dateaquisition: "",
  });
  const { modele, sn, valeur } = inputs;
  async function fetchEquipement() {
    try {
      const response = await fetch(`http://localhost:4000/equipements/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const equipement = await response.json();
      setInputs({
        sn: equipement.sn,
        modele: equipement.modele,
        id_type: equipement.id_type,
        dateaquisition: equipement.dateaquisition,
        valeur: equipement.valeur,
      });
      setSelectedType(equipement.id_type);
      setSelectedDate(new Date(equipement.dateaquisition));
      setSelectedEtat(equipement.id_etat);
    } catch (error) {
      console.error(error.message);
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
  async function fetchEtats() {
    try {
      const response = await fetch("http://localhost:4000/etats", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const parseDate = await response.json();
      setEtats(parseDate);
    } catch (error) {
      console.error(error.message);
    }
  }
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const adjustedDate = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
    );

    try {
      const body = {
        sn,
        modele,
        valeur,
        id_type: selectedType,
        dateaquisition: adjustedDate,
        id_etat: selectedEtat,
      };
      const response = await fetch(
        `http://localhost:4000/equipements/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseData = await response.json();
      if (parseData.equipement) {
        navigate("/");
        toast.success(parseData.message);
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchTypes();
  }, [types]);
  useEffect(() => {
    fetchEtats();
  }, []);
  useEffect(() => {
    fetchEquipement();
  }, []);
  useEffect(() => {
    setSelectedType(selectedType);
  }, [selectedType]);

  return (
    <div className="card mx-auto my-4 shadow" style={{ width: 600 }}>
      <AddTypeForm />
      <form onSubmit={onSubmitForm} className="mx-3">
        <div className="row my-3">
          <div className="col">
            <div className="form-group">
              <label className="mb-2" htmlFor="modele">
                Numéro de série
              </label>
              <input
                className="form-control"
                value={sn}
                onChange={(e) => onChange(e)}
                type="text"
                name="sn"
                id="sn"
                placeholder="SN"
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label className="mb-2" htmlFor="modele">
                Modèle
              </label>
              <input
                value={modele}
                onChange={(e) => onChange(e)}
                className="form-control"
                type="text"
                name="modele"
                id="modele"
                placeholder="Modèle"
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="form-group">
              <label className="mb-2" htmlFor="prenom">
                Type
              </label>
              <div className="d-flex align-items-center ">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="form-select"
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
                <button
                  type="button"
                  className="btn btn-primary ms-2"
                  data-bs-toggle="modal"
                  data-bs-target="#addTypeForm"
                >
                  <span className="fw-bold">+</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label className="mb-2" htmlFor="dateacq">
                Valeur (en DA)
              </label>
              <input
                className="form-control"
                value={valeur}
                onChange={(e) => onChange(e)}
                type="text"
                name="valeur"
                id="valeur"
                placeholder="34330"
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="form-group">
              <label className="mb-2" htmlFor="dateacq">
                Date d'acquisition
              </label>

              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="form-control"
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label className="mb-2" htmlFor="etat">
                Etat
              </label>
              <select
                value={selectedEtat}
                onChange={(e) => setSelectedEtat(e.target.value)}
                className="form-select"
                name="etat"
              >
                <option disabled>Etat</option>
                {etats &&
                  etats.map((etat) => {
                    return (
                      <option key={etat.id_etat} value={etat.id_etat}>
                        {etat.etat}
                      </option>
                    );
                  })}
              </select>
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

export default EquipementEditForm;

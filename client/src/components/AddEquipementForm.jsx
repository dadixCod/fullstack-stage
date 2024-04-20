import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEquipementForm = ({ fetchEquipements, fetchTypes, types ,fetchEtats,etats}) => {
  
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedType, setSelectedType] = useState("Type");
  const [selectedEtat, setSelectedEtat] = useState("Etat");
  const [type, setType] = useState("");
  const [addTypeClicked, setAddTypeClicked] = useState(false);
  const onSubmitType = async (e) => {
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
        fetchTypes();
        toast.success(parseData.message);
        setAddTypeClicked(false);
        setType("");
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const [inputs, setInputs] = useState({
    sn: "",
    modele: "",
    valeur: "",
  });
  const { sn, modele, valeur } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };


  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        sn,
        modele,
        id_type: selectedType,
        dateaquisition: selectedDate,
        valeur,
        id_etat: selectedEtat,
      };
      const response = await fetch(`http://localhost:4000/equipements/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseData = await response.json();
      if (parseData.newEquipement) {
        fetchEquipements();
        toast.success(parseData.message);
        setInputs({
          sn: "",
          modele: "",
          valeur: "",
        });
        setSelectedEtat("Etat");
        setSelectedType("Type");
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);
  useEffect(() => {
    fetchEtats();
  }, []);

  return (
    <div className="mb-4 d-flex justify-content-between align-items-center">
      <div
        className="modal fade"
        id="addEquipementForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addEquipementForm">
                Ajouter un équipement
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
                      <label htmlFor="modele">Numéro de série</label>
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
                      <label htmlFor="modele">Modèle</label>
                      <input
                        className="form-control"
                        value={modele}
                        onChange={(e) => onChange(e)}
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
                      <label htmlFor="type">Type</label>
                      <div className="d-flex align-items-center ">
                        <select
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="form-select"
                          name="type"
                        >
                          <option disabled>Type</option>
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
                          onClick={(e) => setAddTypeClicked(true)}
                          className="btn btn-primary ms-2"
                        >
                          <span className="fw-bold">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {addTypeClicked ? (
                    <div className="form-group mt-2">
                      <div className="d-flex align-items-center mb-2">
                        <input
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="form-control"
                          type="text"
                          placeholder="Ajouter un type"
                        />
                        <button
                          onClick={(e) => onSubmitType(e)}
                          className="btn btn-success ms-2"
                        >
                          <i className="bi bi-check2-all"></i>
                        </button>
                        <button
                          onClick={(e) => setAddTypeClicked(false)}
                          className="btn btn-danger ms-2"
                        >
                          <i class="bi bi-x"></i>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="dateacq">Valeur (en DA)</label>
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
                      <label htmlFor="dateacq">Date d'acquisition</label>
                      <div className="form-group">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          className="form-control"
                          dateFormat="yyyy-MM-dd"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="etat">Etat</label>
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

export default AddEquipementForm;

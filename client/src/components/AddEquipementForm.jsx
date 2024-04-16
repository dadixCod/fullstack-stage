import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEquipementForm = () => {
  const [types, setTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedType, setSelectedType] = useState("Type");

  const [inputs, setInputs] = useState({
    modele: "",
    type: "",
    dateaquisition: "",
  });
  const { modele, type, dateaquisition } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  async function fetchTypes() {
    try {
      const response = await fetch("http://localhost:4000/types", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const parseDate = await response.json();
      setTypes(parseDate);
    } catch (error) {
      console.error(error.message);
    }
  }
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        modele,
        id_type: selectedType,
        dateaquisition: selectedDate,
      };
      const response = await fetch(`http://localhost:4000/equipements/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseData = await response.json();
      if (parseData.newEquipement) {
        toast.success(parseData.message);
        setInputs({
          modele: "",
          type: "",
          dateaquisition: "",
        });
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
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="type">Type</label>
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

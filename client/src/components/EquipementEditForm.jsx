import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EquipementEditForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedType, setSelectedType] = useState("Type");
  const [types, setTypes] = useState([]);
  const [inputs, setInputs] = useState({
    modele: "",
    id_type: "",
    dateaquisition: "",
  });
  const { modele, id_type, dateaquisition } = inputs;
  async function fetchEquipement() {
    try {
      const response = await fetch(`http://localhost:4000/equipements/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const equipement = await response.json();
      setInputs({
        modele: equipement.modele,
        id_type: equipement.id_type,
        dateaquisition: equipement.dateaquisition,
      });
      setSelectedType(equipement.id_type);
      setSelectedDate(new Date(equipement.dateaquisition));
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
        modele,
        id_type: selectedType,
        dateaquisition: adjustedDate,
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
  }, []);
  useEffect(() => {
    fetchEquipement();
  }, []);
  useEffect(() => {
    setSelectedType(selectedType);
  }, [selectedType]);

  return (
    <div className="card mx-auto my-4 shadow" style={{ width: 600 }}>
      <form onSubmit={onSubmitForm} className="mx-3">
        <div className="row my-3">
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
          <div className="col">
            <div className="form-group">
              <label className="mb-2" htmlFor="prenom">
                Type
              </label>
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

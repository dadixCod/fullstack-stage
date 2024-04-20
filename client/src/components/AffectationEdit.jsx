import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AffectationEdit = () => {
  const { num_affectation } = useParams();
  const [equipement, setEquipement] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("Agent");
  const [agents, setAgents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  let navigate = useNavigate();
  async function getAffectation() {
    try {
      const response = await fetch(
        `http://localhost:4000/affectation/details/${num_affectation}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      const parseData = await response.json();
      setEquipement(parseData);
      setSelectedAgent(parseData.id_agent);
      setSelectedDate(new Date(parseData.dateaffectation));
      //   setSelectedModele(parseData.modele);
    } catch (error) {
      console.error(error.message);
    }
  }
  const onSubmitEdit = async (e) => {
    const adjustedDate = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
    );
    e.preventDefault();
    const body = {
      num_inventaire: equipement.num_inventaire,
      id_agent: selectedAgent,
      dateaffectation: adjustedDate,
    };
    try {
      const response = await fetch(
        `http://localhost:4000/affectation/edit/${num_affectation}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseData = await response.json();
      if (parseData.affected) {
        navigate("/");
        toast.success(parseData.message);
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  async function fetchAgents() {
    try {
      const response = await fetch("http://localhost:4000/agents", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const agents = await response.json();
      setAgents(agents);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getAffectation();
  }, []);
  useEffect(() => {
    fetchAgents();
  }, []);
  return (
    <div className="card mx-auto my-4 shadow" style={{ width: 600 }}>
      <div className="col mx-3 my-3">
        <div className="form-group">
          <label className="mb-2" htmlFor="">
            Equipement affecté :
          </label>
          <input
            value={equipement.modele}
            className="form-control"
            disabled
            type="text"
          />
        </div>
      </div>
      <div className="col mx-3 my-3">
        <div className="form-group">
          <label className="mb-2" htmlFor="">
            Choisir un agent :
          </label>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="form-select"
          >
            <option disabled>Agent</option>
            {agents &&
              agents.map((agent) => {
                return (
                  <option key={agent.id_agent} value={agent.id_agent}>
                    {`${agent.nom} ${agent.prenom}`}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <div className="col mx-3 my-3">
        <div className="form-group">
          <label className="mb-2" htmlFor="">
            Date d'affectation:
          </label>
          <div className="col">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
      </div>
      <div className="d-grid col mx-3 my-3">
        <button
          type="submit"
          onClick={(e) => onSubmitEdit(e)}
          className="btn btn-primary"
        >
          Editer
        </button>
      </div>
    </div>
  );
};

export default AffectationEdit;

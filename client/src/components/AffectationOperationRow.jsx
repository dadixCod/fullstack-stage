import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const AffectationOperationRow = () => {
  const [selectedEquipement, setSelectedEquipement] = useState("Equipement");
  const [equipements, setEquipements] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("Agent");
  const [agents, setAgents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [outputs, setOutputs] = useState({
    sn: "",
    modele: "",
    id_type: "",
  });

  async function fetchUnAffectedEquipements() {
    try {
      const response = await fetch(
        "http://localhost:4000/equipements/affectation/libres",
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      const parsedData = await response.json();

      setEquipements(parsedData);
    } catch (error) {
      console.error(error.message);
    }
  }

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

  const equipementValueChange = () => {
    const selectedEquipementItem = equipements.find(
      (equipement) => equipement.num_inventaire === selectedEquipement
    );
    if (selectedEquipementItem) {
      setOutputs({
        sn: selectedEquipementItem.sn,
        modele: selectedEquipementItem.modele,
        id_type: selectedEquipementItem.id_type,
      });
    }
  };

  useEffect(() => {
    if (selectedEquipement !== "Equipement") {
      equipementValueChange();
    }
  }, [selectedEquipement]);

  const onAffectClicked = async (e) => {
    e.preventDefault();
    const body = {
      num_inventaire: selectedEquipement,
      id_agent: selectedAgent,
      dateaffectation: selectedDate,
      sn: outputs.sn,
      modele: outputs.modele,
      id_type: outputs.id_type,
    };
    try {
      const response = await fetch("http://localhost:4000/affectation/affect", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      const parseData = await response.json();
      if (parseData.affected) {
        toast.success(parseData.message);
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAgents();
    fetchUnAffectedEquipements();
  }, []);
  return (
    <div className="card text-bg-light mt-3">
      <div className="mx-4 mt-4 mb-4">
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label className="mb-2" htmlFor="">
                Choisir un équipement :
              </label>
              <select
                value={selectedEquipement}
                onChange={(e) => setSelectedEquipement(e.target.value)}
                className="form-select"
              >
                <option disabled>Equipement</option>
                {equipements &&
                  equipements.map((equipement) => {
                    return (
                      <option
                        key={equipement.num_inventaire}
                        value={equipement.num_inventaire}
                      >
                        {equipement.modele}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="col">
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
          <div className="col">
            <div className="form-group">
              <label className="mb-2" htmlFor="">
                Date d'affectation :
              </label>
              <div className="row row-cols-2">
                <div className="col">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div className="col">
                  <button
                    type="submit"
                    className="btn btn-primary ms-4 "
                    onClick={(e) => onAffectClicked(e)}
                  >
                    Affecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffectationOperationRow;

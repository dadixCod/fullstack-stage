import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddBureauForm from "./AddBureauForm";
import AddAgentForm from "./AddAgentForm";

const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");
  const [bureaux, setBureaux] = useState([]);

  let navigate = useNavigate();
  async function fetchAgents() {
    try {
      const response = await fetch("http://localhost:4000/agents", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const agents = await response.json();
      setAgents(agents);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function searchByName(name) {
    try {
      const response = await fetch(
        `http://localhost:4000/agents/search/${name}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      const parsedData = await response.json();
      setAgents(parsedData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleEditClick = (e, id) => {
    e.stopPropagation();
    navigate(`/agents/update/${id}`);
  };
  const handleDetails = (e, id) => {
    e.stopPropagation();
    navigate(`/agents/details/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:4000/agents/delete/${id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
        }
      );
      const parsedData = await response.json();
      if (parsedData) {
        setAgents(
          agents.filter((agent) => {
            return agent.id_agent !== id;
          })
        );
        toast.success(parsedData.message);
      }
    } catch (error) {
      console.log(error.message);
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

  useEffect(() => {
    if (search === "") {
      fetchAgents();
    } else {
      searchByName(search);
    }
  }, [search]);
  return (
    <div>
      <AddBureauForm />
      <AddAgentForm
        fetchAgents={fetchAgents}
        fetchBureaux={fetchBureaux}
        bureaux={bureaux}
      />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="col">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="form-control w-100"
            placeholder="Recherche par nom"
          />
        </div>

        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-primary col-auto"
            data-bs-toggle="modal"
            data-bs-target="#addAgentModal"
          >
            Ajouter un agent
          </button>
        </div>
      </div>
      {agents.length !== 0 ? <table className="table table-hover table-dark">
        <thead>
          <tr className="table-primary">
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
            <th scope="col">Fonction</th>
            <th scope="col">Sous direction</th>
            <th scope="col">Service</th>
            <th scope="col">Bureau</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {agents &&
            agents.map((agent) => {
              return (
                <tr
                  onClick={(e) => handleDetails(e, agent.id_agent)}
                  key={agent.id_agent}
                >
                  <td>{agent.nom}</td>
                  <td>{agent.prenom}</td>
                  <td>{agent.fonction}</td>
                  <td>{agent.sousdirection}</td>
                  <td>{agent.service}</td>
                  <td>{agent.bureau}</td>

                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={(e) => handleEditClick(e, agent.id_agent)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, agent.id_agent)}
                      className="btn btn-danger"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table> : <h2 className="text-center mt-4">Pas d'agents</h2>}
    </div>
  );
};

export default AgentsList;

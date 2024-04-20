import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import AddEquipementForm from "./AddEquipementForm";
const EquipementsList = () => {
  const [etats, setEtats] = useState([]);
  const [equipements, setEquipements] = useState([]);
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("Filtre par type");

  let navigate = useNavigate();
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
  async function fetchEquipementByType() {
    try {
      if (selectedType === "Filtre par type" || selectedType === "") {
        fetchEquipements();
      } else {
        const response = await fetch(
          `http://localhost:4000/equipements/type/${selectedType}`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
          }
        );
        const parseData = await response.json();
        setEquipements(parseData);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function searchByModele() {
    try {
      const response = await fetch(
        `http://localhost:4000/equipements/search/${search}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      const parseData = await response.json();
      setEquipements(parseData);
    } catch (error) {
      console.error(error);
    }
  }
  const handleDetailsClick = (e, id) => {
    navigate(`/equipements/details/${id}`);
  };

  const handleEditClick = (e, id) => {
    e.stopPropagation();
    navigate(`/equipements/update/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:4000/equipements/delete/${id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
        }
      );
      const parseData = await response.json();
      setEquipements(
        equipements.filter((equipement) => {
          return equipement.num_inventaire != id;
        })
      );
      toast.success(parseData);
    } catch (error) {
      console.log(error.message);
    }
  };
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

  useEffect(() => {
    fetchTypes();
  }, []);
  useEffect(() => {}, [selectedType]);
  useEffect(() => {
    if (search === "") {
      fetchEquipementByType();
    } else {
      searchByModele();
    }
  }, [search, selectedType]);
  return (
    <div>
      <AddEquipementForm
        fetchEquipements={fetchEquipements}
        fetchTypes={fetchTypes}
        types={types}
        fetchEtats={fetchEtats}
        etats={etats}
      />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="col">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="form-control w-100"
            placeholder="Recherche par Modele"
          />
        </div>
        <div className="col-auto ms-3">
          <select
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
            className="form-select"
          >
            <option value={""}>Filtre par type</option>
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

        <div className="col-auto mx-2">
          <button
            type="button"
            className="btn btn-primary col-auto"
            data-bs-toggle="modal"
            data-bs-target="#addEquipementForm"
          >
            Ajouter un équipement
          </button>
        </div>
      </div>

      {equipements.length === 0 ? (
        <h3 className="text-center mt-5">Pas d'équipements ajoutés</h3>
      ) : (
        <table className="table table-hover table-dark">
          <thead>
            <tr className="table-primary">
              <th scope="col">Numero d'inventaire</th>
              <th scope="col">SN</th>
              <th scope="col">Modèle</th>
              <th scope="col">Type</th>
              <th scope="col">Agent</th>
              <th scope="col">Date d'acquisition</th>
              <th scope="col">Date d'affectation</th>
              <th scope="col" style={{ width: "120px" }}>
                Etat
              </th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {equipements &&
              equipements.map((equipement) => {
                return (
                  <tr
                    onClick={(e) =>
                      handleDetailsClick(e, equipement.num_inventaire)
                    }
                    key={equipement.num_inventaire}
                  >
                    <td>{equipement.num_inventaire}</td>
                    <td>{equipement.sn}</td>
                    <td>{equipement.modele}</td>
                    <td>{equipement.type}</td>
                    <td className={equipement.agent ? "" : "text-warning"}>
                      {equipement.agent ?? "Pas Affecté"}
                    </td>
                    <td>
                      {moment(equipement.dateaquisition).format("YYYY-MM-DD")}
                    </td>
                    <td
                      className={
                        equipement.dateaffectation ? "" : "text-warning"
                      }
                    >
                      {equipement.dateaffectation
                        ? moment(equipement.dateaffectation).format(
                            "YYYY-MM-DD"
                          )
                        : "Pas Affecté"}
                    </td>
                    <td>
                      <div
                        className={
                          equipement.etat === "Actif"
                            ? "btn btn-success"
                            : "btn btn-danger"
                        }
                      >
                        {equipement.etat}
                      </div>
                    </td>

                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={(e) =>
                          handleEditClick(e, equipement.num_inventaire)
                        }
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) =>
                          handleDelete(e, equipement.num_inventaire)
                        }
                        className="btn btn-danger"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EquipementsList;

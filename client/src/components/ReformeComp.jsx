import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import PrintableReforme from "./PrintableReforme";

const ReformeComp = () => {
  const [reformes, setReformes] = useState([]);
  const [selectedReforme, setSelectedReforme] = useState(null);
  const componentRef = useRef();
  const handleRowSelect = (reforme) => {
    setSelectedReforme(reforme);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Reforme",
    onAfterPrint: () => setSelectedReforme(null),
  });
  async function fetchReformes() {
    try {
      const response = await fetch("http://localhost:4000/reformes");
      const parsedData = await response.json();
      setReformes(parsedData);
    } catch (error) {
      console.error(error.message);
    }
  }
  const handleDelete = async (e, num_reforme, num_inventaire) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette réforme ?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const body = { num_inventaire };
      const response = await fetch(
        `http://localhost:4000/reformes/delete/${num_reforme}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parsedData = await response.json();
      fetchReformes();
      toast.success(parsedData.message);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleSold = async (e, num_reforme, num_inventaire) => {
    e.preventDefault();
    const confirmSold = window.confirm(
      "Êtes-vous sûr que cet équipement est vendu ?"
    );
    if (!confirmSold) {
      return;
    }
    try {
      const body = { num_inventaire };
      const response = await fetch(
        `http://localhost:4000/reformes/sold/${num_reforme}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseData = await response.json();
      fetchReformes();
      toast.success(parseData.message);
    } catch (error) {
      toast.error("Erreur");
    }
  };
  useEffect(() => {
    fetchReformes();
  }, []);
  return (
    <div>
      <h1 className="text-center my-3">Reforme</h1>

      {reformes.length !== 0 ? (
        <table className="table table-hover table-light ">
          <thead>
            <tr className="table-primary">
              <th>Numero de reforme</th>
              <th>Equipement</th>

              <th>Date d'acquisition</th>
              <th>Date de reforme</th>
              <th>Etat</th>
              <th>Imprimer</th>
              <th>Vendu</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {reformes &&
              reformes.map((reforme) => {
                return (
                  <tr
                    key={reforme.num_reforme}
                    onClick={() => handleRowSelect(reforme)}
                  >
                    <td>{reforme.num_reforme}</td>
                    <td>{`${reforme.modele} : ${reforme.type}`}</td>

                    <td>
                      {moment(reforme.dateaquisition).format("YYYY-MM-DD")}
                    </td>
                    <td>{moment(reforme.datereforme).format("YYYY-MM-DD")}</td>
                    <td
                      className={reforme.etat ? "text-success fw-semibold" : ""}
                    >
                      {reforme.etat ?? "En reforme"}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={handlePrint}
                      >
                        <i className="bi bi-printer-fill"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={(e) =>
                          handleSold(
                            e,
                            reforme.num_reforme,
                            reforme.num_inventaire
                          )
                        }
                      >
                        <i
                          className="bi bi-cart-check
                        "
                        ></i>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) =>
                          handleDelete(
                            e,
                            reforme.num_reforme,
                            reforme.num_inventaire
                          )
                        }
                        type="button"
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
      ) : (
        <h2 className="text-center -mt -4">Pas de réformes</h2>
      )}
      {selectedReforme === null ? (
        <></>
      ) : (
        <div style={{ opacity: 0 }} className="card">
          <PrintableReforme ref={componentRef} data={selectedReforme} />
        </div>
      )}
    </div>
  );
};

export default ReformeComp;

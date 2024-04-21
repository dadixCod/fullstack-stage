import React, { useEffect, useState, useRef } from "react";
import MaintenanceOperationRow from "./MaintenanceOperationRow";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import PrintableTicket from "./PrintableTicket";

const MaintenanceComp = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);

  const handleRowSelect = (ticket) => {
    setSelectedTicket(ticket);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Ticket ",
    onAfterPrint: () => setSelectedTicket(null),
  });

  async function fetchTickets() {
    try {
      const response = await fetch("http://localhost:4000/maintenance");
      const parseData = await response.json();
      setTickets(parseData);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleFinish(id_maintenance, num_inventaire) {
    const confirmFinished = window.confirm(
      "Êtes-vous sûr que la maintenance de cet équipement est terminée ?"
    );
    if (!confirmFinished) {
      return;
    }
    try {
      const body = { datefin: new Date(), num_inventaire };
      const response = await fetch(
        `http://localhost:4000/maintenance/finish/${id_maintenance}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseData = await response.json();
      if (parseData.terminated) {
        toast.success(parseData.message);
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id_maintenance === id_maintenance
              ? { ...ticket, datefin: body.datefin }
              : ticket
          )
        );
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {}
  }
  async function handleDelete(id_maintenance) {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce ticket ?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:4000/maintenance/delete/${id_maintenance}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
        }
      );
      const parseData = await response.json();
      setTickets(
        tickets.filter((ticket) => {
          return ticket.id_maintenance !== id_maintenance;
        })
      );
      toast.success(parseData.message);
    } catch (error) {}
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <h1 className="text-center">Maintenance</h1>
      <MaintenanceOperationRow fetchTickets={fetchTickets} />

      <table className="table table-hover table-dark">
        <thead>
          <tr className="table-primary">
            <th scope="col">Numero du ticket</th>
            <th scope="col">Equipement</th>
            <th scope="col">Date Début</th>
            <th scope="col">Date Fin</th>
            <th scope="col">Imprimer</th>
            <th scope="col">Finir</th>
            <th scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {tickets &&
            tickets.map((ticket) => {
              return (
                <tr
                  key={ticket.id_maintenance}
                  onClick={() => handleRowSelect(ticket)}
                >
                  <td>{ticket.id_maintenance}</td>
                  <td>{ticket.modele}</td>
                  <td>{moment(ticket.datedebut).format("YYYY-MM-DD")}</td>
                  <td className={ticket.datefin ? "" : "text-warning"}>
                    {ticket.datefin
                      ? moment(ticket.datefin).format("YYYY-MM-DD")
                      : "Pas résolu"}
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
                        handleFinish(
                          ticket.id_maintenance,
                          ticket.num_inventaire
                        )
                      }
                    >
                      <i className="bi bi-check-all"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(ticket.id_maintenance)}
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
      {selectedTicket === null ? (
        <></>
      ) : (
        <div style={{ opacity: 0 }}>
          <PrintableTicket ref={componentRef} data={selectedTicket} />
        </div>
      )}
    </div>
  );
};

export default MaintenanceComp;

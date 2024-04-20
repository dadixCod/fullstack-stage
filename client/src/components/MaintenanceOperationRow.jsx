import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MaintenanceOperationRow = ({ fetchTickets }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedEquipement, setSelectedEquipement] = useState("Equipements");
  const [equipements, setEquipements] = useState([]);
  async function fetchEquipements() {
    try {
      const response = await fetch("http://localhost:4000/equipements");
      const parseData = await response.json();
      setEquipements(parseData);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const body = {
        num_inventaire: selectedEquipement,
        datedebut: selectedDate,
      };
      const response = await fetch("http://localhost:4000/maintenance/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseData = await response.json();

      if (parseData.added) {
        fetchTickets();
        toast.success(parseData.message);
        setSelectedDate(new Date());
        setSelectedEquipement("Equipements");
      } else {
        toast.error(parseData.message);
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchEquipements();
  }, []);
  return (
    <div className="card text-bg-light mt-3 mb-4">
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
                <option disabled>Equipements</option>
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
                Choisir une date :
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
                    onClick={(e) => onSubmitForm(e)}
                  >
                    Créer un ticket
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

export default MaintenanceOperationRow;

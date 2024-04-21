import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";

const EquipementDetailsComp = () => {
  const { id } = useParams();

  const [equipement, setEquipement] = useState("");
  const [isOlderThanFiveYears, setIsOlderThanFiveYears] = useState(null);

  async function fetchEquipement() {
    try {
      const response = await fetch(
        `http://localhost:4000/equipements/details/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const equipement = await response.json();

      setEquipement(equipement);
    } catch (error) {
      console.error(error.message);
    }
  }

  const addToReforme = async (e, selectedEquipement) => {
    e.preventDefault();

    try {
      const body = {
        num_inventaire: id,
        sn: selectedEquipement.sn,
        modele: selectedEquipement.modele,
        id_type: selectedEquipement.id_type,
        dateaquisition: selectedEquipement.dateaquisition,
        datereforme: new Date(),
      };
      const response = await fetch("http://localhost:4000/reformes/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseData = await response.json();
      if (parseData.created) {
        fetchEquipement();
        toast.success(parseData.message);
      } else {
        toast.error("Erreur");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkIfOlderThanFiveYears = () => {
    const currentDate = moment();

    const acquisitionDate = moment(equipement.dateaquisition);

    const yearsDifference = currentDate.diff(acquisitionDate, "years");

    const isOlder = yearsDifference >= 5;
    setIsOlderThanFiveYears(isOlder);
    console.log(isOlder);
  };

  useEffect(() => {
    fetchEquipement();
  }, []);
  useEffect(() => {
    checkIfOlderThanFiveYears();
  }, [equipement]);
  return (
    <div>
      <h2 className="text-center mt-3">Détails</h2>

      <MDBCard className="mb-4 mx-auto my-4 shadow" style={{ width: 800 }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Numéro du Série</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">{equipement.sn}</MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Modèle</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">
                {equipement.modele}
              </MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Type</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">
                {equipement.type}
              </MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Valeur</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">
                {equipement.valeur} DA
              </MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Agent</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">
                {equipement.agent_nom
                  ? `${equipement.agent_nom} ${equipement.agent_prenom}`
                  : "Pas Affecté"}
              </MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Bureau</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">
                {equipement.bureau ?? "Pas affecté"}
              </MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Date d'acquisition</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">
                {moment(equipement.dateaquisition).format("YYYY-MM-DD")}
              </MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Date d'affectation</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">
                {equipement.dateaffectation
                  ? moment(equipement.dateaffectation).format("YYYY-MM-DD")
                  : "Pas Affecté"}
              </MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Etat</MDBCardText>
            </MDBCol>
            <MDBCol
              className="d-flex justify-content-between align-items-center"
              sm="9"
            >
              <MDBCardText
                className={
                  equipement.etat === "Actif"
                    ? "btn btn-success fw-semibold"
                    : equipement.etat === "En panne"
                    ? "btn btn-danger fw-semibold"
                    : "btn btn-warning fw-semibold"
                }
              >
                {equipement.etat}
              </MDBCardText>
              {isOlderThanFiveYears && equipement.etat !== "En reforme" ? (
                <MDBCardText
                  onClick={(e) => addToReforme(e, equipement)}
                  className="col-auto btn btn-primary "
                >
                  Mettre en reforme
                </MDBCardText>
              ) : (
                <></>
              )}
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default EquipementDetailsComp;

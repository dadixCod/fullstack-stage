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

const EquipementDetailsComp = () => {
  const { id } = useParams();

  const [equipement, setEquipement] = useState("");

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

  useEffect(() => {
    fetchEquipement();
  }, []);
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
            <MDBCol sm="9">
              <MDBCardText className="text-muted">
                <div
                  className={
                    equipement.etat === "Actif"
                      ? "btn btn-success"
                      : "btn btn-danger"
                  }
                >
                  {equipement.etat}
                </div>
              </MDBCardText>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default EquipementDetailsComp;

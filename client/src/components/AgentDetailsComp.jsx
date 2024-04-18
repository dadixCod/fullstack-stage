import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";

const AgentDetailsComp = () => {
  const { id } = useParams();

  const [agent, setAgent] = useState("");
  const [equipements, setEquipements] = useState([]);
  const [total, setTotal] = useState("");
  async function fetchUser() {
    try {
      const response = await fetch(
        `http://localhost:4000/agents/details/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const agent = await response.json();

      setAgent(agent);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function fetchUserEquipements() {
    try {
      const response = await fetch(
        `http://localhost:4000/equipements/user/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const parseData = await response.json();

      setTotal(parseData.total);
      setEquipements(parseData.equipements);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    fetchUserEquipements();
  }, [equipements]);
  return (
    <div>
      <h2 className="text-center mt-3">
        Détails
      </h2>

      <MDBCard className="mb-4 mx-auto my-4 shadow" style={{ width: 800 }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Nom Complet</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">
                {agent.nom} <span> </span>
                {agent.prenom}
              </MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Fonction</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">{agent.fonction}</MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Bureau</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">{agent.bureau}</MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Sous Direction</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">
                {agent.sousdirection}
              </MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Service</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">{agent.service}</MDBCardText>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Equipements</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText className="text-muted">
                <div className="mb-2">
                  <strong>Total:</strong> {total}
                </div>
                {equipements.map((equipement, index) => (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        {" "}
                        {/* Adjust margin-right as needed */}
                        <strong>Modèle:</strong> {equipement.modele}
                      </div>
                      <div style={{ marginRight: "150px" }}>
                        <strong>Type:</strong> {equipement.type}
                      </div>
                    </div>
                  </div>
                ))}
              </MDBCardText>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AgentDetailsComp;

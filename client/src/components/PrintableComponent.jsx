import React, { forwardRef } from "react";
import moment from "moment";

const PrintableComponent = forwardRef(({ data }, ref) => {
  return (
    <div ref={ref} style={{ width: "100%", padding: "20px" }}>
      
      <div style={{ marginBottom: "20px" }}>
        <div style={{ float: "left", width: "40%", marginRight: "20px" }}>
          <strong>
            CAISSE NATIONALE DES RETRAITES <br />
            AGENCE LOCALE DE DE LA WILAYA DE MASCARA <br />
            STRUCTURE INFORMATIQUE
          </strong>
        </div>
        <div style={{ float: "right" }}>
          <strong>MASCARA LE {moment().format("YYYY-MM-DD")}</strong>
        </div>
        <div style={{ clear: "both" }}></div>
      </div>

      {/* Subject */}
      <div style={{  marginTop:"50px", marginBottom: "20px" }}>
        <h3 style={{ textAlign: "center" }}>
          BON D'AFFECTATION ET DE TRANSFERT <br /> DU MATERIEL INFORMATIQUE
        </h3>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        {/* Table headers */}
        <thead>
          {/* Table row */}
          <tr style={{ background: "#f1f1f1" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              N° d'affectation
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              N° d'inventaire
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>SN</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Désignation</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Agent</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Date d'affectation
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Single row */}
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {data.num_affectation}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {data.num_inventaire}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {data.sn}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {`${data.type} :  ${data.modele}`}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {`${data.nom} ${data.prenom}`}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {moment(data.dateaffectation).format("YYYY-MM-DD")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default PrintableComponent;

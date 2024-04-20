import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

const PrintableStatistiques = () => {
  const [data, setData] = useState([]);
  const componentRef = useRef();
  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:4000/statistiques/printed",
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      const parseData = await response.json();
      setData(parseData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Statistiques",
    onAfterPrint: () => toast.success("Statistiques Imprimés avec succès"),
  });

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" ">
      <button
        onClick={generatePDF}
        className="btn btn-primary mb-3 me-5 px-5 float-end "
      >
        Imprimer
      </button>
      <div ref={componentRef} style={{ width: "90%" }}>
        <div className="mt-5 mb-5">
            <h3 className="text-center">Statistiques des équipements :</h3>
        </div>
        <table className="table table-hover table-light table-bordered ms-5 ">
          <thead>
            <tr className="table-secondary">
              <th scope="col" className="text-center">
                Type
              </th>
              <th scope="col" className="text-center">
                Quantité
              </th>
              <th scope="col" className="text-center">
                Actif
              </th>
              <th scope="col" className="text-center">
                En panne
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((equipement) => {
                return (
                  <tr>
                    <td className="text-center">{equipement.type}</td>
                    <td className="text-center">{equipement.quantity}</td>
                    <td className="text-center">{equipement.actif}</td>
                    <td className="text-center">{equipement.enpanne}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintableStatistiques;

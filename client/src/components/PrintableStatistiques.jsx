import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PrintableStatistiques = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      setIsLoading(true);
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
      console.error("Error fetching data:", error.message);
      toast.error("Erreur lors du chargement des données");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Alternative print function using window.print()
  const handlePrint = () => {
    const printContent = document.getElementById("printable-content");

    if (!printContent) {
      toast.error("Contenu à imprimer non trouvé");
      return;
    }

    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      toast.error(
        "Impossible d'ouvrir la fenêtre d'impression. Vérifiez les paramètres de votre navigateur."
      );
      return;
    }

    // Write the content to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Statistiques</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
            h3 { text-align: center; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    // Wait for content to load then print
    printWindow.document.close();
    printWindow.onload = function () {
      printWindow.print();
      printWindow.onafterprint = function () {
        printWindow.close();
        toast.success("Statistiques Imprimés avec succès");
      };
    };
  };

  return (
    <div className="">
      <button
        onClick={handlePrint}
        className="btn btn-primary mb-3 me-5 px-5 float-end"
        disabled={isLoading}
      >
        {isLoading ? "Chargement..." : "Imprimer"}
      </button>

      <div id="printable-content" style={{ width: "90%" }}>
        <div className="mt-5 mb-5">
          <h3 className="text-center">Statistiques des équipements :</h3>
        </div>
        {isLoading ? (
          <p className="text-center">Chargement des données...</p>
        ) : data && data.length > 0 ? (
          <table className="table table-hover table-light table-bordered ms-5">
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
                <th scope="col" className="text-center">
                  En Reforme
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((equipement) => (
                <tr key={equipement.type}>
                  <td className="text-center">{equipement.type}</td>
                  <td className="text-center">{equipement.quantity}</td>
                  <td className="text-center">{equipement.actif}</td>
                  <td className="text-center">{equipement.enpanne}</td>
                  <td className="text-center">{equipement.enreforme}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">Aucune donnée disponible</p>
        )}
      </div>
    </div>
  );
};

export default PrintableStatistiques;

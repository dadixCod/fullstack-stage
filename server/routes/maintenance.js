const router = require("express").Router();
const pool = require("../db");

router.get("", async (req, res) => {
  try {
    const maintenances = await pool.query(
      "SELECT id_maintenance,maintenance.num_inventaire,equipement.modele,datedebut,datefin FROM maintenance JOIN equipement ON equipement.num_inventaire = maintenance.num_inventaire ORDER BY id_maintenance"
    );
    res.status(200).json(maintenances.rows);
  } catch (error) {
    res.json("Serveur Erreur");
    console.log(error.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { num_inventaire, datedebut } = req.body;
    if (num_inventaire !== "Equipements" && datedebut) {
      const response = await pool.query(
        "INSERT INTO maintenance(num_inventaire,datedebut) values ($1,$2) RETURNING *",
        [num_inventaire, datedebut]
      );
      const updateEquipement = await pool.query(
        "UPDATE equipement SET id_etat = 2 WHERE num_inventaire = $1",
        [num_inventaire]
      );
      res.status(201).json({
        message: "Ticket de maintenance enregistré avec succès",
        added: response.rows[0],
        updated: updateEquipement.rows[0],
      });
    } else {
      res.json({
        message: "Equipement ou date est vide",
      });
    }
  } catch (error) {
    res.json("Serveur Erreur");
    console.log(error.message);
  }
});

router.put("/finish/:id_maintenance", async (req, res) => {
  const { id_maintenance } = req.params;
  try {
    const { datefin, num_inventaire } = req.body;
    if ((datefin, num_inventaire)) {
      const response = await pool.query(
        "UPDATE maintenance SET datefin = $1 WHERE id_maintenance = $2 RETURNING *",
        [datefin, id_maintenance]
      );
      const updateEquipement = await pool.query(
        "UPDATE equipement SET id_etat = 1 WHERE num_inventaire = $1 RETURNING *",
        [num_inventaire]
      );
      res.status(200).json({
        message: "Maintenance terminée avec succès",
        terminated: response.rows[0],
        updated: updateEquipement.rows[0],
      });
    } else {
    }
  } catch (error) {
    console.error(error.message);
  }
});
router.delete("/delete/:id_maintenance", async (req, res) => {
  const { id_maintenance } = req.params;
  try {
    await pool.query("DELETE FROM maintenance WHERE id_maintenance = $1", [
      id_maintenance,
    ]);

    res.json({
      message: "Ticket supprimé avec succès",
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;

const router = require("express").Router();
const pool = require("../db");

router.get("", async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT COUNT(equipement.id_type) as quantity ,types.type FROM equipement join types on equipement.id_type = types.id_type GROUP BY (equipement.id_type,types.type)"
    );

    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error.message);
  }
});
router.get("/printed", async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT t.type,COUNT(e.id_type) AS Quantity, SUM(CASE WHEN et.id_etat = 1 THEN 1 ELSE 0 END) AS Actif, SUM(CASE WHEN et.id_etat = 2 THEN 1 ELSE 0 END) AS Enpanne FROM equipement e JOIN types t ON e.id_type = t.id_type JOIN etats et ON e.id_etat = et.id_etat GROUP BY t.type"
    );

    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error.message);
  }
});




module.exports = router;

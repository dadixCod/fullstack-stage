const router = require("express").Router();

const pool = require("../db");

router.get("", async (req, res) => {
  try {
    const reformes = await pool.query(
      "SELECT num_reforme,modele,r.id_type,t.type ,sn,dateaquisition,datereforme,num_inventaire,etat FROM reformes r JOIN types t ON t.id_type = r.id_type"
    );
    res.status(200).json(reformes.rows);
  } catch (error) {
    console.log(error.message);
    res.json("Serveur Erreur");
  }
});

router.post("/add", async (req, res) => {
  try {
    const { num_inventaire, sn, modele, id_type, dateaquisition, datereforme } =
      req.body;
    const response = await pool.query(
      "INSERT INTO reformes(modele,id_type,sn,dateaquisition,datereforme,num_inventaire) values($1,$2,$3,$4,$5,$6) RETURNING *",
      [modele, id_type, sn, dateaquisition, datereforme, num_inventaire]
    );
    const updateRes = await pool.query(
      "UPDATE equipement SET id_etat = 3 WHERE num_inventaire = $1 RETURNING *",
      [num_inventaire]
    );
    res.status(201).json({
      message: "Equipement transféré au reforme avec succès",
      created: response.rows[0],
      updated: updateRes.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.json("Serveur Erreur");
  }
});

router.put("/update/:num_reforme", async (req, res) => {
  const { num_reforme } = req.params;

  try {
    const { datereforme } = req.body;
    const updateRes = await pool.query(
      "UPDATE reformes SET datereforme = $1 WHERE num_reforme = $2 RETURNING * ",
      [datereforme, num_reforme]
    );
    res.status(200).json({
      message: "Reforme edité avec succès",
      updated: updateRes.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.json("Serveur Erreur");
  }
});

router.delete("/delete/:num_reforme", async (req, res) => {
  const { num_reforme } = req.params;
  try {
    const { num_inventaire } = req.body;
    const response = await pool.query(
      "DELETE FROM reformes WHERE num_reforme = $1 ",
      [num_reforme]
    );
    const updateRes = await pool.query(
      "UPDATE equipement SET id_etat = 1 WHERE num_inventaire = $1 RETURNING *",
      [num_inventaire]
    );
    res.json({
      message: "Reforme Supprimé avec succès",
    });
  } catch (error) {
    console.log(error.message);
    res.json("Serveur Erreur");
  }
});

router.put("/sold/:num_reforme", async (req, res) => {
  const { num_reforme } = req.params;
  try {
    const { num_inventaire } = req.body;
    const soldResult = await pool.query(
      "UPDATE reformes SET etat = 'Vendu' WHERE num_reforme = $1",
      [num_reforme]
    );
    const equipement = await pool.query(
      "DELETE FROM equipement WHERE num_inventaire = $1 RETURNING *",
      [num_inventaire]
    );

    res.json({
      message: "Equipement Vendu!",
    });
  } catch (error) {
    console.log(error.message);
    res.json("Serveur Erreur");
  }
});

module.exports = router;

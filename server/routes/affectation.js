const router = require("express").Router();
const pool = require("../db");

router.get("", async (req, res) => {
  try {
    const affectations = await pool.query(
      "SELECT num_affectation,num_inventaire,sn,modele,types.type,agents.nom,agents.prenom,dateaffectation FROM affectation JOIN types ON affectation.id_type = types.id_type JOIN agents ON affectation.id_agent = agents.id_agent ORDER BY dateaffectation DESC"
    );
    res.status(200).json(affectations.rows);
  } catch (error) {
    res.json("Serveur Erreur");
  }
});

//affect
router.put("/affect", async (req, res) => {
  try {
    const { num_inventaire, id_agent, dateaffectation, sn, id_type, modele } =
      req.body;
    if (num_inventaire && id_agent && dateaffectation) {
      const affectedEquipement = await pool.query(
        "UPDATE equipement SET id_agent = $1 , dateaffectation = $2 WHERE num_inventaire = $3 RETURNING *",
        [id_agent, dateaffectation, num_inventaire]
      );

      const insertResult = await pool.query(
        "INSERT INTO affectation (num_inventaire,sn,modele,id_type,id_agent,dateaffectation) values($1,$2,$3,$4,$5,$6) RETURNING * ",
        [num_inventaire, sn, modele, id_type, id_agent, dateaffectation]
      );

      res.status(200).json({
        message: "Equipement affecté avec succès",
        affected: affectedEquipement.rows[0],
        inserted: insertResult.rows[0],
      });
    } else {
      res.json({
        message: "Il y a des champs vides",
      });
    }
  } catch (error) {
    res.json(error.message);
    console.log(error.message);
  }
});

module.exports = router;

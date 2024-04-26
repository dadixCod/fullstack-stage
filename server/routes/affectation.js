const router = require("express").Router();
const pool = require("../db");

router.get("", async (req, res) => {
  try {
    const affectations = await pool.query(
      "SELECT num_affectation,num_inventaire,sn,modele,types.type,agents.nom,agents.prenom,dateaffectation FROM affectation LEFT JOIN types ON affectation.id_type = types.id_type LEFT JOIN agents ON affectation.id_agent = agents.id_agent ORDER BY num_affectation ASC"
    );
    console.log("Affectation called");
    res.status(200).json(affectations.rows);
  } catch (error) {
    res.json("Serveur Erreur");
  }
});

//get affectation by num_affectation

router.get("/details/:num_affectation", async (req, res) => {
  const { num_affectation } = req.params;
  try {
    const affectations = await pool.query(
      "SELECT * FROM affectation WHERE num_affectation = $1 ORDER BY dateaffectation DESC",
      [num_affectation]
    );
    res.status(200).json(affectations.rows[0]);
  } catch (error) {
    console.log(error.message);
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
//edit affect
router.put("/edit/:num_affectation", async (req, res) => {
  const { num_affectation } = req.params;
  try {
    const { num_inventaire, id_agent, dateaffectation } = req.body;
    if (num_inventaire && id_agent && dateaffectation) {
      const affectedEquipement = await pool.query(
        "UPDATE equipement SET id_agent = $1 , dateaffectation = $2 WHERE num_inventaire = $3 RETURNING *",
        [id_agent, dateaffectation, num_inventaire]
      );

      const updateAffectation = await pool.query(
        "UPDATE affectation SET id_agent = $1 , dateaffectation = $2 WHERE num_affectation = $3 RETURNING * ",
        [id_agent, dateaffectation, num_affectation]
      );

      res.status(200).json({
        message: "Equipement Edité avec succès",
        affected: affectedEquipement.rows[0],
        updated: updateAffectation.rows[0],
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

router.put("/undoaffect/:num_affectation", async (req, res) => {
  const { num_affectation } = req.params;
  try {
    const { num_inventaire } = req.body;
    const deletedEquipementAffected = await pool.query(
      "UPDATE equipement SET id_agent = NULL , dateaffectation = NULL WHERE num_inventaire = $1 RETURNING *",
      [num_inventaire]
    );
    const updateAffectation = await pool.query(
      "UPDATE affectation SET id_agent = NULL , dateaffectation = NULL WHERE num_affectation = $1 RETURNING *",
      [num_affectation]
    );
    res.json({
      message: "Affectation anullée avec succès",
    });
  } catch (error) {
    console.error(error.message);
  }
});
//delete affectation

router.delete("/delete/:num_affectation", async (req, res) => {
  const { num_affectation } = req.params;
  try {
    const response = await pool.query(
      "DELETE FROM affectation WHERE num_affectation = $1",
      [num_affectation]
    );
    console.log("Delete called");

    res.json({
      message: "Affectation supprimée avec succès",
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;

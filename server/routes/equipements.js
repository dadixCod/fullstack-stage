const router = require("express").Router();
const pool = require("../db");
//------------Equipements-------------

//get Equipements
router.get("", async (req, res) => {
  try {
    const equipemnts = await pool.query(
      "SELECT sn,num_inventaire,equipement.modele,types.type,agents.nom as agent,dateaquisition,dateaffectation,etats.etat FROM equipement LEFT JOIN agents ON agents.id_agent = equipement.id_agent  JOIN types ON  equipement.id_type = types.id_type JOIN etats ON equipement.id_etat = etats.id_etat ORDER BY num_inventaire ASC"
    );
    res.status(200).json(equipemnts.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
//get one Equipement
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const equipemnt = await pool.query(
      "SELECT * from equipement WHERE num_inventaire=$1",
      [id]
    );
    res.status(200).json(equipemnt.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
//get equipements by type
router.get("/type/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const equipemnts = await pool.query(
      "SELECT sn,num_inventaire,equipement.modele,types.type,agents.nom as agent,dateaquisition,dateaffectation,etats.etat FROM equipement LEFT JOIN agents ON agents.id_agent = equipement.id_agent  JOIN types ON  equipement.id_type = types.id_type JOIN etats ON equipement.id_etat = etats.id_etat  WHERE equipement.id_type = $1 ORDER BY num_inventaire ASC",
      [id]
    );
    res.status(200).json(equipemnts.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
//get equipements by users
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const equipements = await pool.query(
      "SELECT modele,types.type FROM equipement JOIN types ON equipement.id_type = types.id_type WHERE id_agent = $1 ",
      [id]
    );
    res.status(200).json({
      total: equipements.rows.length,
      equipements: equipements.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
//get equipement details joined
router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const equipements = await pool.query(
      "SELECT sn,equipement.modele,types.type,valeur,agents.nom as agent_nom, agents.prenom as agent_prenom,dateaquisition,dateaffectation,etats.etat FROM equipement LEFT JOIN agents ON agents.id_agent = equipement.id_agent  JOIN types ON  equipement.id_type = types.id_type JOIN etats ON equipement.id_etat = etats.id_etat WHERE num_inventaire = $1 ",
      [id]
    );
    res.status(200).json(equipements.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
//get equipements by modele -search
router.get("/search/:letter", async (req, res) => {
  const { letter } = req.params;
  try {
    const equipemnts = await pool.query(
      "SELECT sn,num_inventaire,equipement.modele,types.type,agents.nom as agent,dateaquisition,dateaffectation,etats.etat FROM equipement LEFT JOIN agents ON agents.id_agent = equipement.id_agent  JOIN types ON  equipement.id_type = types.id_type JOIN etats ON equipement.id_etat = etats.id_etat WHERE equipement.modele ILIKE '%' || $1 || '%' ORDER BY num_inventaire ASC",
      [letter]
    );
    res.status(200).json(equipemnts.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
//get unaffected equipements
router.get("/affectation/libres", async (req, res) => {
  try {
    const equipements = await pool.query(
      "SELECT * FROM equipement WHERE dateaffectation IS NULL "
    );
    res.status(200).json(equipements.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//get type ,sn,modele of equipemt by its num_inventaire for affectation
router.get("/affectation/:num_inventaire", async (req, res) => {
  const { num_inventaire } = req.params;
  try {
    const response = await pool.query(
      "SELECT sn,modele,id_type FROM equipement WHERE num_inventaire = $1",
      [num_inventaire]
    );
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//add equipement
router.post("/add", async (req, res) => {
  try {
    //1. destructure body
    const { sn, modele, id_type, valeur, dateaquisition, id_etat } = req.body;

    if (sn && modele && id_type && valeur && dateaquisition && id_etat) {
      //3. add to database
      const newEquipement = await pool.query(
        "INSERT INTO equipement (sn,modele,id_type,valeur,dateaquisition,id_etat) values($1,$2,$3,$4,$5,$6) RETURNING *",
        [sn, modele, id_type, valeur, dateaquisition, id_etat]
      );

      res.status(200).json({
        message: "Equipement ajouté avec succès",
        newEquipement: newEquipement.rows[0],
      });
    } else {
      res.json({
        message: "Il y a des champs vides",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//update equipement
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //1. destructure body
    const { sn, modele, id_type, valeur, dateaquisition, id_etat } = req.body;

    if ((sn, modele && id_type && valeur && dateaquisition && id_etat)) {
      const updatedEquipement = await pool.query(
        "UPDATE equipement  SET sn = $1, modele = $2 , id_type = $3 ,valeur = $4 ,dateaquisition = $5,id_etat=$6 WHERE num_inventaire = $7 RETURNING *",
        [sn, modele, id_type, valeur, dateaquisition, id_etat, id]
      );

      res.status(200).json({
        message: "Equipement edité avec succès",
        equipement: updatedEquipement.rows[0],
      });
    } else {
      res.json({
        message: "Il y a des champs vides",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//delete an equipement
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const equipement = await pool.query(
      "DELETE FROM equipement WHERE num_inventaire = $1 RETURNING *",
      [id]
    );
    if (equipement.rows.length === 0) {
      return res.status(404).json("Equipement non trouvé");
    }
    res.status(200).json("Equipement supprimé avec succès");
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

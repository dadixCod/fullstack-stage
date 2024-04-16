const router = require("express").Router();
const pool = require("../db");
//------------Equipements-------------

//get Equipements
router.get("", async (req, res) => {
  try {
    const equipemnts = await pool.query(
      "SELECT num_lot,equipement.modele,types.type,agents.nom as agent,dateaquisition,dateaffectation FROM equipement LEFT JOIN agents ON equipement.num_lot = agents.id_equipement JOIN types ON  equipement.id_type = types.id_type ORDER BY num_lot ASC"
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
      "SELECT * from equipement WHERE num_lot=$1",
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
      "SELECT num_lot,equipement.modele,types.type,agents.nom as agent,dateaquisition,dateaffectation FROM equipement LEFT JOIN agents ON equipement.num_lot = agents.id_equipement JOIN types ON  equipement.id_type = types.id_type WHERE equipement.id_type = $1 ORDER BY num_lot ASC",
      [id]
    );
    res.status(200).json(equipemnts.rows);
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
      "SELECT num_lot,equipement.modele,types.type,agents.nom as agent,dateaquisition,dateaffectation FROM equipement LEFT JOIN agents ON equipement.num_lot = agents.id_equipement JOIN types ON  equipement.id_type = types.id_type WHERE equipement.modele ILIKE '%' || $1 || '%' ORDER BY num_lot ASC",
      [letter]
    );
    res.status(200).json(equipemnts.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//add equipement
router.post("/add", async (req, res) => {
  try {
    //1. destructure body
    const { modele, id_type, dateaquisition } = req.body;

    if (modele && id_type && dateaquisition) {
      // //2. check if already exist
      // const equipement = await pool.query(
      //   "SELECT * FROM equipement WHERE modele = $1",
      //   [modele]
      // );

      // if (equipement.rows.length !== 0) {
      //   return res.json("Equipement déja existe ");
      // }

      //3. add to database
      const newEquipement = await pool.query(
        "INSERT INTO equipement (modele,id_type,dateaquisition) values($1,$2,$3) RETURNING *",
        [modele, id_type, dateaquisition]
      );

      res.status(200).json({
        message: "Equipement ajouté avec succès",
        newEquipement: newEquipement.rows[0],
      });
    } else {
      res.json({
        message: "Modele ou type ou Date d'aquisition est vide",
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
    const { modele, id_type, dateaquisition } = req.body;

    if (modele && id_type && dateaquisition) {
      const updatedEquipement = await pool.query(
        "UPDATE equipement  SET modele = $1 , id_type = $2 , dateaquisition = $3 WHERE num_lot = $4 RETURNING *",
        [modele, id_type, dateaquisition, id]
      );

      res.status(200).json({
        message: "Equipement edité avec succès",
        equipement: updatedEquipement.rows[0],
      });
    } else {
      res.json({
        message: "Modele ou type ou data d'aquisition est vide",
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
      "DELETE FROM equipement WHERE num_lot = $1 RETURNING *",
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

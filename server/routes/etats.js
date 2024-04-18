const router = require("express").Router();
const pool = require("../db");

//------------Etats-------------

//get etats
router.get("", async (req, res) => {
  try {
    const etats = await pool.query("SELECT * FROM etats ");
    res.status(200).json(etats.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//add etat
router.post("/add", async (req, res) => {
  try {
    //1. destructure body
    const { etat } = req.body;

    if (etat) {
      //2. check if already exist
      const oldEtat = await pool.query(
        "SELECT * FROM etats WHERE etat = $1",
        [etat]
      );

      if (oldEtat.rows.length !== 0) {
        return res.json("Etat déja existe ");
      }

      //3. add to database
      const newEtat = await pool.query(
        "INSERT INTO etatss (etats) values($1) RETURNING *",
        [etat]
      );

      res.status(200).json({
        message: "Etat ajouté avec succès",
        newEtat: newEtat.rows[0],
      });
    } else {
      return res.json({
        message: "Etat est vide",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//update sous direction
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //1. destructure body
    const { sousdirection } = req.body;

    if (sousdirection) {
      const updatedSousDirection = await pool.query(
        "UPDATE sousdirections  SET sousdirection = $1 WHERE id_sousdirection = $2 RETURNING *",
        [sousdirection, id]
      );

      res.status(200).json(updatedSousDirection.rows[0]);
    } else {
      return res.json("Sous direction est vide");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//delete a sous direction
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sousdirection = await pool.query(
      "DELETE FROM sousdirections WHERE id_sousdirection = $1 RETURNING *",
      [id]
    );
    if (sousdirection.rows.length === 0) {
      return res.status(404).json("Sousdirection non trouvé");
    }
    res.status(200).json("Sousdirection supprimé avec succès");
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

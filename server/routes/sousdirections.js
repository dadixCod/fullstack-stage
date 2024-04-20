const router = require("express").Router();
const pool = require("../db");

//------------Sous Direction-------------

//get sousdirections
router.get("", async (req, res) => {
  try {
    const sousdirections = await pool.query("SELECT * FROM sousdirections ");
    console.log("Sous Directions called");
    res.status(200).json(sousdirections.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//add sous direction
router.post("/add", async (req, res) => {
  try {
    //1. destructure body
    const { sousdirection } = req.body;

    if (sousdirection) {
      //2. check if already exist
      const oldSousdirection = await pool.query(
        "SELECT * FROM sousdirections WHERE sousdirection = $1",
        [sousdirection]
      );

      if (oldSousdirection.rows.length !== 0) {
        return res.json("Sous Direction déja existe ");
      }

      //3. add to database
      const newSousDirection = await pool.query(
        "INSERT INTO sousdirections (sousdirection) values($1) RETURNING *",
        [sousdirection]
      );

      res.status(200).json({
        message: "Nouvelle Sous Direction ajoutée avec succès",
        newSousDirection: newSousDirection.rows[0],
      });
    } else {
      res.json({
        message: "Sous direction est vide",
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

      res.status(200).json({
        message: "Sous Direction mis à jour avec succès",
        updated: updatedSousDirection.rows[0],
      });
    } else {
      res.json({
        message: "Sous direction est vide",
      });
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
    res.status(200).json({
      message: "Sousdirection supprimé avec succès",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

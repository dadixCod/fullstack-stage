const router = require("express").Router();
const pool = require("../db");

//------------Bureaux-------------

//get bureaux
router.get("", async (req, res) => {
  try {
    const bureaux = await pool.query("SELECT * FROM bureaux ");
    console.log("Bureaux called");
    res.status(200).json(bureaux.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//add bureau
router.post("/add", async (req, res) => {
  try {
    //1. destructure body
    const { bureau } = req.body;

    if (bureau) {
      //2. check if already exist
      const oldBureau = await pool.query(
        "SELECT * FROM bureaux WHERE bureau = $1",
        [bureau]
      );

      if (oldBureau.rows.length !== 0) {
        return res.json("Bureau déja existe ");
      }

      //3. add to database
      const newBureau = await pool.query(
        "INSERT INTO bureaux (bureau) values($1) RETURNING *",
        [bureau]
      );

      res.status(200).json({
        message: "Bureau ajouté avec succès",
        newBureau: newBureau.rows[0],
      });
    } else {
      return res.json({
        message: "Bureau est vide",
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

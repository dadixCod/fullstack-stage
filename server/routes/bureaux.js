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

//update bureau
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //1. destructure body
    const { bureau } = req.body;

    if (bureau) {
      const updatedbureau = await pool.query(
        "UPDATE bureaux  SET bureau = $1 WHERE id_bureau = $2 RETURNING *",
        [bureau, id]
      );

      res.status(200).json({
        message: "Bureau modifié avec succès",
        updated: updatedbureau.rows[0],
      });
    } else {
      return res.json("Bureau est vide");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//delete a bureau
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bureau = await pool.query(
      "DELETE FROM bureaux WHERE id_bureau = $1 RETURNING *",
      [id]
    );
    if (bureau.rows.length === 0) {
      return res.status(404).json("Bureau non trouvé");
    }
    res.status(200).json("Bureau supprimé avec succès");
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

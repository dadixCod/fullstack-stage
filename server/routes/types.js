const router = require("express").Router();
const pool = require("../db");

//------------Types-------------

//get Types
router.get("/", async (req, res) => {
  try {
    const types = await pool.query("SELECT * FROM types ");
    res.status(200).json(types.rows);
    console.log("Called");
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//add type
router.post("/add", async (req, res) => {
  try {
    //1. destructure body
    const { type } = req.body;

    if (type) {
      //2. check if already exist
      const oldtype = await pool.query("SELECT * FROM types WHERE type = $1", [
        type,
      ]);

      if (oldtype.rows.length !== 0) {
        return res.json("Type déja existe ");
      }

      //3. add to database
      const newType = await pool.query(
        "INSERT INTO types (type) values($1) RETURNING *",
        [type]
      );

      res.status(200).json({
        message: "Type ajouté avec succès",
        newType: newType.rows[0],
      });
    } else {
      res.json({
        message: "Type est vide",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//update type
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //1. destructure body
    const { type } = req.body;

    if (type) {
      const updatedType = await pool.query(
        "UPDATE types  SET type = $1 WHERE id_type = $2 RETURNING *",
        [type, id]
      );

      res.status(200).json({
        message: "Type modifié avec succès",
        updated: updatedType.rows[0],
      });
    } else {
      res.json("Type est vide");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//delete a type
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const type = await pool.query(
      "DELETE FROM types WHERE id_type = $1 RETURNING *",
      [id]
    );
    if (type.rows.length === 0) {
      return res.status(404).json("Type non trouvé");
    }
    res.status(200).json({
      message: "Type supprimé avec succès",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

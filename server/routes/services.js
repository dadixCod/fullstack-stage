const router = require("express").Router();
const pool = require("../db");

//------------Services-------------

//get services
router.get("", async (req, res) => {
  try {
    const services = await pool.query("SELECT * FROM services ");
    res.status(200).json(services.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
//get services on the sous directions
router.get("/sousdirection/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const services = await pool.query(
      "SELECT * FROM services WHERE id_sousdirection = $1 ",
      [id]
    );
    res.status(200).json(services.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//add service
router.post("/add", async (req, res) => {
  try {
    //1. destructure body
    const { id_sousdirection, service } = req.body;

    if (id_sousdirection && service) {
      //2. check if already exist
      const oldService = await pool.query(
        "SELECT * FROM services WHERE service = $1",
        [service]
      );

      if (oldService.rows.length !== 0) {
        return res.json("Service déja existe ");
      }

      //3. add to database
      const newService = await pool.query(
        "INSERT INTO services (id_sousdirection,service) values($1,$2) RETURNING *",
        [id_sousdirection, service]
      );

      res.status(200).json(newService.rows[0]);
    } else {
      return res.json("Service ou Sous Direction est vide");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//update service
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //1. destructure body
    const { id_sousdirection, service } = req.body;

    if (id_sousdirection && service) {
      const updatedService = await pool.query(
        "UPDATE services  SET id_sousdirection = $1 , service = $2 WHERE id_service = $3 RETURNING *",
        [id_sousdirection, service, id]
      );

      res.status(200).json(updatedService.rows[0]);
    } else {
      return res.json("Service ou Sous direction est vide");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//delete a service
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const service = await pool.query(
      "DELETE FROM services WHERE id_service = $1 RETURNING *",
      [id]
    );
    if (service.rows.length === 0) {
      return res.status(404).json("Service non trouvé");
    }
    res.status(200).json("Service supprimé avec succès");
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

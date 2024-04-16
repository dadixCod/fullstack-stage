const router = require("express").Router();
const pool = require("../db");

//agents
//get agents
router.get("/", async (req, res) => {
  try {
    const agents = await pool.query(
      "SELECT id_agent,agents.nom,prenom,fonction,sousdirection,service,equipement.modele as equipement FROM agents  JOIN sousdirections ON agents.id_sousdirection = sousdirections.id_sousdirection JOIN services ON agents.id_service = services.id_service LEFT JOIN equipement ON agents.id_equipement = equipement.num_lot"
    );
    res.status(200).json(agents.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
//get one agent
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const agents = await pool.query(
      "SELECT * FROM agents WHERE id_agent = $1",
      [id]
    );
    res.status(200).json(agents.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//get agent based on letters --search--
router.get("/search/:letter", async (req, res) => {
  const { letter } = req.params;
  try {
    const response = await pool.query(
      "SELECT * FROM agents WHERE nom ILIKE '%' || $1 || '%' ",
      [letter]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
});

//add an agent
router.post("/add", async (req, res) => {
  try {
    //1.destructure body
    const {
      nom,
      prenom,
      fonction,
      id_sousdirection,
      id_service,
      id_equipement,
    } = req.body;
    //2. check if agent already exists
    const agent = await pool.query(
      "SELECT * FROM agents WHERE nom = $1 and prenom = $2",
      [nom, prenom]
    );
    if (agent.rows.length !== 0) {
      return res.json("Agent déja enregistré");
    }
    //3. add agent to database

    const newUser = await pool.query(
      "INSERT INTO agents(nom,prenom,fonction,id_sousdirection,id_service) values ($1,$2,$3,$4,$5) RETURNING *",
      [nom, prenom, fonction, id_sousdirection, id_service]
    );
    return res.status(200).json({
      message: "Agent ajouté avec succès",
      newUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
//update an agent
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, fonction, id_sousdirection, id_service } = req.body;

  try {
    const agent = await pool.query(
      "UPDATE agents SET nom = $1, prenom = $2, fonction = $3, id_sousdirection = $4, id_service = $5  WHERE id_agent = $6 RETURNING *",
      [nom, prenom, fonction, id_sousdirection, id_service, id]
    );
    res.status(200).json({
      message: "Agent mis à jour avec succès",
      agent: agent.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//delete an agent

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const agent = await pool.query(
      "DELETE FROM agents WHERE id_agent = $1 RETURNING *",
      [id]
    );
    if (agent.rows.length === 0) {
      return res.status(404).json("Agent non trouvé");
    }
    res.status(200).json({
      message: "Agent supprimé avec succès",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

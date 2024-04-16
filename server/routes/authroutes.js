const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middlewares/validInfo");
const authorization = require("../middlewares/authorization");

//register route

router.post("/register", validInfo, async (req, res) => {
  try {
    //1. destructure body
    const { nom_utilisateur, motpasse } = req.body;

    //2. check if user already exist
    const user = await pool.query(
      "SELECT * FROM admin WHERE nom_utilisateur = $1 ",
      [nom_utilisateur]
    );
    if (user.rows.length !== 0) {
      return res.status(401).json("Utilisateur existe deja");
    }

    //3.hash password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(motpasse, salt);

    //4. store to database
    const newUser = await pool.query(
      "INSERT INTO admin (nom_utilisateur,motpasse) values($1,$2) RETURNING *",
      [nom_utilisateur, bcryptPassword]
    );

    //4. generate a jwt token

    const token = jwtGenerator(newUser.rows[0].idemp);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//login route
router.post("/login", validInfo, async (req, res) => {
  try {
    //1. destructure the body
    const { nom_utilisateur, motpasse } = req.body;

    //2. check if user doesn't exist in db
    const user = await pool.query(
      "SELECT * FROM admin WHERE nom_utilisateur = $1",
      [nom_utilisateur]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Utilisateur n'existe pas");
    }

    //3. check the password
    const validPassword = await bcrypt.compare(motpasse, user.rows[0].motpasse);
    if (!validPassword) {
      return res.status(401).json("Nom d'utilisateur ou Mot de passe est invalide");
    }

    //4. generate a jwt token
    const token = jwtGenerator(user.rows[0].idemp);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

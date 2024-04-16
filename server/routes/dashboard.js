const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middlewares/authorization");

router.get("", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM admin WHERE id_admin = $1", [
      req.user_id,
    ]);
    res.status(200).json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});


module.exports = router;

module.exports = (req, res, next) => {
  const { nom_utilisateur, motpasse } = req.body;

  if (req.path === "/register") {
    if (![nom_utilisateur, motpasse].every(Boolean)) {
      return res.status(401).json("Identifiants Invalides");
    }
  } else if (req.path === "/login") {
    if (![nom_utilisateur, motpasse].every(Boolean)) {
      return res.status(401).json("Indentifiants Invalides");
    }
  }

  next();
};

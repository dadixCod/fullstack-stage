import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    nom_utilisateur: "",
    motpasse: "",
  });
  const { nom_utilisateur, motpasse } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { nom_utilisateur, motpasse };
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login avec succès");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
  return (
    <div className="card text-center mb-3 shadow " style={{ width: 450 }}>
      <h4 className="my-4">Login</h4>
      <form onSubmit={onSubmitForm}>
        <div className="form-group mx-4 my-3">
          <input
            value={nom_utilisateur}
            onChange={(e) => onChange(e)}
            type="text"
            id="name"
            name="nom_utilisateur"
            className="form-control"
            placeholder="Nom d'utilisateur"
          />
        </div>
        <div className="form-group mx-4 my-3">
          <input
            value={motpasse}
            onChange={(e) => onChange(e)}
            type="password"
            id="motpasse"
            name="motpasse"
            className="form-control"
            placeholder="Mot de passe"
          />
        </div>
        <div className="d-grid mx-4 my-5">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

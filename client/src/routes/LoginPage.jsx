import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = ({ setAuth }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <LoginForm setAuth={setAuth} />
    </div>
  );
};

export default LoginPage;

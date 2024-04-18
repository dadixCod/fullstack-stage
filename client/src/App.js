import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import UpdateAgentPage from "./routes/UpdateAgentPage";
import UpdateEquipementPage from "./routes/UpdateEquipementPage";
import EquipementDetailsPage from "./routes/EquipementDetailsPage";
import AgentDetailsPage from "./routes/AgentDetailsPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  async function isAuth() {
    try {
      const response = await fetch("http://localhost:4000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      window.alert(error);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route
            exact
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            exact
            path="/"
            element={
              isAuthenticated ? (
                <HomePage setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/agents/update/:id"
            element={
              isAuthenticated ? <UpdateAgentPage /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/agents/details/:id"
            element={
              isAuthenticated ? <AgentDetailsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/equipements/update/:id"
            element={
              isAuthenticated ? (
                <UpdateEquipementPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/equipements/details/:id"
            element={
              isAuthenticated ? (
                <EquipementDetailsPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
      <ToastContainer autoClose={2000} />
    </Fragment>
  );
}

export default App;

import React from "react";

import AgentsList from "./AgentsList";

const AgentsComp = () => {
  return (
    <div className="container d-grid">
      <h1 className="text-center">Agents</h1>
      <AgentsList></AgentsList>
    </div>
  );
};

export default AgentsComp;

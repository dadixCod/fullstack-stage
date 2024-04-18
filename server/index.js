const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
//login & regisyer
app.use("/auth", require("./routes/authroutes"));

//dashboard route

app.use("/", require("./routes/dashboard"));

//agents route
app.use("/agents", require("./routes/agents"));

//types route
app.use("/types", require("./routes/types"));

//services route
app.use("/services", require("./routes/services"));

//equipements route
app.use("/equipements", require("./routes/equipements"));

//Sous directions route
app.use("/sousdirections", require("./routes/sousdirections"));

//Bureaux route
app.use("/bureaux", require("./routes/bureaux"));

//Etats route
app.use("/etats", require("./routes/etats"));

//Affectation route
app.use("/affectation", require("./routes/affectation"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port : ${port}`);
});

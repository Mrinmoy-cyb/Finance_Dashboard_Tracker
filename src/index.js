const express= require("express");
const app = express();

app.use(express.json());

app.use("/auth", require ("./routes/auth"));
app.use("/records" , require("./routes/records"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/users", require("./routes/users"));

app.use(require("./middleware/error"));

app.listen(5000, () => console.log("Server Running!"));

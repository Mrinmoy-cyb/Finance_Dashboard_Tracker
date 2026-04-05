const express= require("express");
const app = express();

app.use(express.json());

app.use("/auth", require ("./routes/auth"));
app.use("/records" , require("./routes/records"));
app.use("/dashboard", require("./routes/dashboard"));

app.use(require("./middleware/error"));

app.listen(3000, () => console.log("Server Running"));
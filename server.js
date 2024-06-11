require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

require("./db/db");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
 
const authRoutes = require("./routes/auth");
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

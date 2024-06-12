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
 const {adminAuthMiddleware, accountAuthMiddleware} = require('./utils/middleware');
const adminAuthRoutes = require("./routes/admin/auth");
const adminIndex = require("./routes/admin/index");
const userAuthRoutes = require("./routes/account/auth");
const accountIndex = require("./routes/account/index"); 
app.use(express.json());

app.use("/admin/auth", adminAuthRoutes);
app.use("/admin", adminAuthMiddleware, adminIndex);
app.use("/account/auth", userAuthRoutes);
app.use("/account", accountAuthMiddleware, accountIndex);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

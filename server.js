const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`服务端启动成功，端口为${PORT}。`));
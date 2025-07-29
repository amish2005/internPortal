//app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cookieParser = require("cookie-parser");
const profRoutes = require("./routes/profile");
const jobRoutes = require("./routes/job"); 
const messageRoutes = require("./routes/message"); 


dotenv.config();
connectDB();
const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:8080", 
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use("/api/auth", authRoutes);
app.use("/profile", profRoutes);
app.use("/api/job", jobRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/chat", messageRoutes);


app.get('/', (req, res) => res.send('API is running...'));

module.exports = app;

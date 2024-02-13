require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const multer = require('multer');
const { connectToMongoDb } = require("./connection");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const {auth} =require("./middlewares/auth");

const app = express();
const authRouter = require("./routes/authRouter");
const examRouter = require("./routes/examRouter");
const documentRouter = require("./routes/documentRouter"); // Import the documentRouter
const profileRouter = require("./routes/profileRouter"); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add this line to parse JSON data
app.use(cookieParser());
connectToMongoDb();

const port=process.env.port || 4000;
const corsOptions = {
    origin: `${process.env.FRONTEND}`,
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
const upload = multer({ dest: 'uploads/' });

app.get("/", (req, res)=>{
    res.send("<h1>Working Fine</h1>");
});
app.use("/api/auth", authRouter.router);
app.use("/api/exam", auth, examRouter.router);
app.use("/api/documents", auth,  documentRouter.router); 
app.use("/api/profile", auth, profileRouter.router);

app.listen(port, ()=>{
    console.log("server is running on port", {port});
});

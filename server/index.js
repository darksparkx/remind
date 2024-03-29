const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/router");
const cors = require("cors");

dotenv.config();

const app = express();

// Connect To Mongo
const mongoURL= process.env.MONGOURL;

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("mongo connected.");
    })
    .catch((error) => {
        console.log(error);
    });

// Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rules for API
app.use(cors())
app.use((req, res, next) => {
    res.header("Cross-Origin-Opener-Policy", "unsafe-none");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
    }

    next();
});

// Routes
app.use("/users", router);

app.get("/", (req, res) => {
    res.send("here");
});

// Error Handling
app.use((req, res, next) => {
    const error = new Error("not found");

    return res.status(404).json({
        message: error.message,
    });
});

// Listen for Requests
app.listen(1337, () => {
    console.log(`[server]: Server is running at https://localhost:1337`);
});

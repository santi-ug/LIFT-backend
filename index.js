import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import routerApi from "./src/routes/index.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5001;

// run db config

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// routes

// default route
app.get("/", (req, res) => {
	res.json("Hello World");
});

routerApi(app);

app.listen(port, () => {
	console.log("Server is running on port ", port);
});

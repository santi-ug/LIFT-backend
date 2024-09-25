import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

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

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});

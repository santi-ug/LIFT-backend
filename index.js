import routerApi from './src/routes/index.js';
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5001; 

app.get("/api", (req, res) => {
	res.send("Hello World");
});

routerApi(app);

app.listen(port, () => {
	console.log("Server is running on port ", port);
});

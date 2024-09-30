import cors from "cors";
import express from "express";
import routerApi from "./src/routes/router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5001;

// app.get("/", (req, res) => {
// 	res.send("Hello World");
// });

routerApi(app);

app.listen(port, () => {
	console.log("Server is running on port ", port);
});

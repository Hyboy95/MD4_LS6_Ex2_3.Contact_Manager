import express from "express";
import bodyParser from "body-parser";
import { Database } from "./src/models/data-source";
import { contactRoutes } from "./src/routers/web.router";

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.set('views', 'src/views');

Database
    .connect()
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));

app.use(express.static('src/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(contactRoutes);

app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})
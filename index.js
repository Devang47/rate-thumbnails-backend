import express from "express";
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb', extended: true }));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("listening on port " + PORT)
});

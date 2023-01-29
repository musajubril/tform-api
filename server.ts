import express from "express"
import path from "path"
import cors from "cors"
import mongoose from "mongoose"
import { RequestResponse } from "form_data.interface";
import FormDataController from './form_data.controller';
const app = express();
const PORT = process.env.PORT || 8000;

const mongoURI = process.env.ATLAS_URI || "mongodb://localhost/TForm"
mongoose.connect(mongoURI)
 .then(()=>console.log('MongoDB database connected successfully'))
 .catch(error=>console.error(error))

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/form_data", (req: RequestResponse["req"], res: RequestResponse["res"])=>FormDataController.PostFormData(req, res))
app.get("/api/form_data", (req: RequestResponse["req"], res: RequestResponse["res"])=>FormDataController.GetFormData(req, res))
app.get("/api/form_data/:_id", (req: RequestResponse["req"], res: RequestResponse["res"])=>FormDataController.GetSingleFormData(req, res))

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const form_data_controller_1 = __importDefault(require("./form_data.controller"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const mongoURI = process.env.ATLAS_URI || "mongodb://localhost/TForm";
mongoose_1.default.connect(mongoURI)
    .then(() => console.log('MongoDB database connected successfully'))
    .catch(error => console.error(error));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.post("/api/form_data", (req, res) => form_data_controller_1.default.PostFormData(req, res));
app.get("/api/form_data", (req, res) => form_data_controller_1.default.GetFormData(req, res));
app.get("/api/form_data/:_id", (req, res) => form_data_controller_1.default.GetSingleFormData(req, res));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

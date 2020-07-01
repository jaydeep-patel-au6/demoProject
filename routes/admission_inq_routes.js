import express from "express";
import auth from "../middleware/check-auth"

import Admission from "../controller/admission_inq_controller";
const routes = express.Router();

const admission = new Admission();

routes.get("/", admission.admissionInqGet); //admission inq form route

routes.post("/",admission.admissionInqPost); // admission inq post route

routes.get("/list", admission.admissionInqList); // admission inq display data route

routes.get("/delete/:id", admission.admissionInqDelete); // admission inq data delete by id

module.exports = routes;

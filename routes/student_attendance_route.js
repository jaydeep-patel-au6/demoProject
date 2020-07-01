import express from "express";
const routes = express.Router();
import Att from "../controller/student_attendance_controller";

const att = new Att();

routes.get("/", att.getatt); // get attendance

routes.post("/", att.postatt); // post request store data in collection

routes.get("/:id", att.idatt); // timetABLE id

routes.get("/delete/:id", att.deleteatt); // TIMETABLE delete by id

module.exports = routes;

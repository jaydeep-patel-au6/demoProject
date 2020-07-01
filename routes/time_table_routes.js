import express from "express";
const routes = express.Router();
import Timetable from "../controller/time_table_controller";

const timetable = new Timetable();

routes.get("/", timetable.getTimetable); // get timetable

routes.post("/", timetable.postTimetable); // post request store data in collection

routes.get("/:id", timetable.idTimetable); // timetABLE id

routes.get("/delete/:id", timetable.deleteTimetable); // TIMETABLE delete by id

module.exports = routes;

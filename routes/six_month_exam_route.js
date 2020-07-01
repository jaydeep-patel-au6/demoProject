import express from "express";

const routes = express.Router();
import SixExam from "../controller/six_month_exam_controller";

const sixExam = new SixExam();

routes.get("/", sixExam.getSixMarks); // get data

routes.post("/", sixExam.postSixMarks); // post form route 6 month exam marks

routes.get("/:id", sixExam.idSixMarks); // id

routes.get("/delete/:id", sixExam.deleteSixMarks); //delete by id

module.exports = routes;

module.exports = routes;

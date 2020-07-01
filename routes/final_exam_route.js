import express from "express";
import auth from "../middleware/check-auth"
const routes = express.Router();
import FinalExam from "../controller/final_exam_controller";

const finalExam = new FinalExam();

routes.get("/",auth.admin_token, finalExam.getfinal); // get data

routes.post("/",auth.admin_token, finalExam.postfinal); // post form route final exam marks

routes.get("/:id",auth.admin_token, finalExam.idfinal); // id

routes.get("/delete/:id",auth.admin_token, finalExam.deletefinal); //delete by id

module.exports = routes;

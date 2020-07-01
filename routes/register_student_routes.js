import express from "express";
import { route } from "../controller/stu_user";
//const { route } = require('../controller/stu_user')
const routes = express.Router();
import student1 from "../controller/register_student_controller";

const student = new student1();

routes.get("/", student.getData); // get studentdata in deshboard route

module.exports = routes;

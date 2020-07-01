import express from "express";
import { route } from "../controller/stu_user";
//const { route } = require('../controller/stu_user')
const routes = express.Router();
import AdminLogin from "../controller/adminlogin_controller";

const adminLogin = new AdminLogin();

routes.get("/", adminLogin.getHomePage);

module.exports = routes;

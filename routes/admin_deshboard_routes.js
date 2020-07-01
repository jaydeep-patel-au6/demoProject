import express from "express";
const routes = express.Router();
import Deshboard from "../controller/admin_deshboard_controller";
import auth from "../middleware/check-auth"

const deshboard = new Deshboard();

routes.get("/", auth.admin_token,deshboard.gethomepage);

module.exports = routes;

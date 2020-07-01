import express from "express";
const routes = express.Router();
import auth from "../middleware/check-auth"
import Anno from "../controller/announcement_controller";

const anno = new Anno();

routes.get("/", anno.getAnno); // announcemnet form route

routes.post("/", anno.postAnno); // announcement form post route

routes.get("/:id",auth.admin_token, anno.idAnno); // announcement id

routes.get("/delete/:id",auth.admin_token, anno.deleteAnno); // announcement delete by id

module.exports = routes;

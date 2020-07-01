import express from "express";

const routes = express.Router();
import Ticket from "../controller/ticket_controller";

const ticket = new Ticket();

routes.get("/", ticket.getTicket); //get data

routes.post("/", ticket.postTicket); //post data

routes.get("/:id", ticket.idTicket); //getid

module.exports = routes;

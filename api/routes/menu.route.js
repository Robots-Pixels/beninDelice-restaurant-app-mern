import express from "express";
import { getMenu } from "../controllers/menu.controller.js";

export const menuRouter = express.Router()
menuRouter.get("/all", getMenu)

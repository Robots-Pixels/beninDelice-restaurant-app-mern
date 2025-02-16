import mongoose from "mongoose"
import Dish from "../models/menuModel.js"

export const getMenu = async(req, res) => {
    try {
        const menu = await Dish.find()
        res.status(200).json(menu)
    } catch (error) {
        res.status(500).json({"message": "erreur du serveur", error})
    }
}

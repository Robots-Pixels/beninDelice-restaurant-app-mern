import mongoose from "mongoose";

const dishesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },

    min_price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    image:{
        type: String,
        required: true,
        default: "https://img.buzzfeed.com/buzzfeed-static/static/2020-06/11/14/asset/dcb5220da65d/sub-buzz-86-1591886919-8.jpg"
    }
})

const Dish = mongoose.model("Dishe", dishesSchema);

export default Dish;
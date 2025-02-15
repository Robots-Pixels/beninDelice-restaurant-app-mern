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
    }
})

const Dish = mongoose.model("Dishe", dishesSchema);

export default Dish;
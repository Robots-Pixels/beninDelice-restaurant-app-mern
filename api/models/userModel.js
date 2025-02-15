import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nom:{
        type: String,
        required: false
    },

    prenom:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true,
        minlength: 8,
    },

    email:{
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    
    telephone:{
        type: String,
        required: true,
        unique: true
    },

    countryCode:{
        type: String,
        required: true
    }
}, 
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);

export default User;
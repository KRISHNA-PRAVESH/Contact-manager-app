const mongoose = require("mongoose");

//defining a schema for the database
const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add the contact name"],
    },
    email:{
        type:String,
        required:[true,"Please add the email"],
    },
    phone:{
        type:String,
        required:[true, "Please add phone"],
    },
  },
    {
        timestamps:true,
    }

);

module.exports = mongoose.model("Contact", contactSchema)
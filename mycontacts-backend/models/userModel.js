const mongoose = require("mongoose");

//defining a schema for the database
const userSchema = mongoose.Schema(
    {
      username:{
        type:String,
        required:[true,"Please add the contact name"],
      },
      email:{
        type:String,
        required:[true,"Please add the email"],
        unique: [true, "Email already exists"]
      },
      password:{
        type:String,
        required: [true, "Please add the user password"]
      }
   },

    {
        timestamps:true,
    }

);

module.exports = mongoose.model("User", userSchema)
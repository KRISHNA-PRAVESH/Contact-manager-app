const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT;

//connecting to the mongodb database
connectDb();
app.use(express.json()); //body parser

//middleware
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));

app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
})

require('dotenv').config()
const express = require('express');
const cors=require('cors');
const connect=require("./database/db");
const BookRouter=require("./routes/bookRouter");
const {openApi}  = require('./openapispec');
const swaggerUi= require('swagger-ui-express')

const port=process.env.PORT || 3000
const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("Welcome to the Book Management System");
})
app.use("/book",BookRouter);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(openApi));

connect();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

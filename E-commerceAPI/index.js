const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");


dotenv.config();


//connect mangoDB
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("DBConnection Successful!")).catch((error)=>{console.log(error);});

app.use(cors());
app.use(express.json());
//create REST API
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", stripeRoute);



//listen port number
app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
})
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();


//Create product
router.post("/", verifyTokenAndAdmin, async (request, response) => {
    const newProduct = new Product(request.body);
    try {
        const savedProduct = await newProduct.save();
        response.status(200).json(savedProduct);
    } catch (error) {
        response.status(500).json(error);
    }
  });



//Update product
router.put("/:id", verifyTokenAndAdmin, async (request, response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(request.params.id,{$set: request.body}, {new: true});
        response.status(200).json(updatedProduct);
    } catch (error) {
        response.status(500).json(error);
    }
  });



//Delete product
router.delete("/:id", verifyTokenAndAdmin, async (request, response) => {
    try {
        await Product.findByIdAndDelete(request.params.id);
        response.status(200).json("Product has been deleted");
    } catch (error) {
        response.status(500).json(error);
    }
});


  

//Get product by id
router.get("/find/:id", async (request, response) => {
    try {
        const product = await Product.findById(request.params.id);
        response.status(200).json(product);
    } catch (error) {
        response.status(500).json(error);
    }
});



//Get all products
router.get("/", async (request, response) => {
    //get products by created dates and their categories
    const queryNew = request.query.new;
    const queryCategory = request.query.category;
    try {
        //create an array
        let products;
        if (queryNew) {
            products = await Product.find().sort({createdAt: -1}).limit(1);
        } else if (queryCategory) {
            products = await Product.find({categories: {$in: [queryCategory]}});
        } else {
            products = await Product.find();
        }
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json(error);
    }
});



module.exports = router;
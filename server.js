const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String
});
const Product = mongoose.model("Product", ProductSchema);

app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.listen(3000, () => console.log("Server running on port 3000"));
app.post("/checkout", (req, res) => {
    console.log("Checkout data:", req.body);
    res.json({ message: "Order placed successfully!" });
});

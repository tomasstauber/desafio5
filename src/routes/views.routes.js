import express from "express";
import ProductManager from "../dao/ProductManager.js";
import CartManager from "../dao/CartManager.js"

const router = express.Router();
const PM = new ProductManager();
const CM = new CartManager();

router.get("/", async (req, res) => {
    const products = await PM.getProducts(req.query);
    res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

router.get("/products", async (req, res) => {
    const products = await PM.getProducts(req.query);
    res.render("products", {products});
});

router.get("/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    const product = await PM.getProductById(pid);
    res.render("product", {product});
});

router.get("/chat", (req, res) => {
    res.render("chat");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/profile", (req, res) => {
    res.render("profile");
});

router.get("/cart/:cid", async (req, res) => {
    const cid = req.params.cid;
    const cart = await CM.getCart(cid);

    if (cart) {
        res.render("cart", {products:cart.products});
    } else {
        res.status(400).send({status:"error", message:"Error! No existe ningún carrito con ese Id!"});
    }
});

router.get("/restore", (req, res) => {
    res.render("restore");
})

router.get("/failregister", (req, res) => {
    res.render("failregister");
})

export default router;
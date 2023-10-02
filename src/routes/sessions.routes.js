import express from "express";
import UserManager from "../dao/UserManager.js";
import { createHash } from "../utils.js";
import passport from "passport";

const router = express.Router();
const UM = new UserManager();

router.post("/login", passport.authenticate("login", {failureRedirect:"/faillogin"}), async (req, res) => {
    if (!req.user) {
        return res.status(401).send({status:"error", message:"Usuario y Contraseña incorrectos!"});
    }

    req.session.user = {first_name:req.user.first_name, last_name:req.user.last_name, email:req.user.email, age:req.user.age};
    res.redirect("/products");
});

router.post("/register", passport.authenticate("register", {failureRedirect:"/failregister"}), async (req, res) => {
    res.redirect("/login");
});

router.get("/logout", async (req, res) => {
    req.session.destroy;
    res.redirect("/");
});

router.get("/restore", async (req, res) => {
    let { user, pass } = req.query;
    pass = createHash(pass);
    const passwordRestored = await UM.restorePassword(user, pass);
    if (passwordRestored) {
        res.send({ status: "Ok", message: "Contraseña actualizada correctamente!" });
    } else {
        res.status(401).send({ status: "Error", message: "Ha ocurrido un error al actualizar la contraseña!" });
    }
})

export default router;
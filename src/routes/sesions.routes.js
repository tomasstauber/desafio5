import express from "express";
import UserManager from "../dao/UserManager.js";
import { createHash } from "../utils.js";
import { isValidPassword } from "../utils.js";
import passport from "passport";

const router = express.Router();
const UM = new UserManager();

/* router.get("/login", async (req, res) => {
    let {user, pass} = req.query;
    const userLogged = await UM.loggin(user, pass);
    if (userLogged) {
        res.send({status: "OK", message:"Usuario logueado correctamente!" + userLogged});
    } else {
        res.status(401).send({status: "Error", message: "Ha ocurrido un error al loguear el usuario!"});
    }
}); */

router.get("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), async (req, res) => {
    if (!req.user) {
        return res.status(401).send({ status: "Error", message: "Contraseña o usuario incorrectos!" });
    }
    req.session.user = { first_name: req.user.first_name, last_name: req.user.last_name, email: req.user.email, age: req.user.age };
    //res.send({ status: "Ok", message: "Bienvenidx " + userLogged.first_name });
    res.redirect("/products");
});

router.get("/faillogin", (req, res) => {
    res.send({status:"Error", message:"Ha ocurrido un error al loguear el usuario!"});
});

/* router.post("/register", async (req, res) => {
    const userRegistered = await UM.addUser(req.body);
    if (userRegistered) {
        res.send({status: "OK", message:"Usuario logueado correctamente!" + userRegistered});
    } else {
        res.status(401).send({status: "Error", message: "Ha ocurrido un error al registrar el usuario!"})
    }
    
}); */

router.post("/register", passport.authenticate("register", { failureRedirect: "/failregister" }), async (req, res) => {
    res.send({ status: "Ok", message: "Usuario resgistrado correctamente!" });
});

router.get("/failregister", (req, res) => {
    res.send({ status: "Error", message: "Ha ocurrido un error al registrar el usuario!" });
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
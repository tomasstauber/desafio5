import passport from "passport";
import local from "passport-local";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
    passport.use("register", new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                let user = userModel.findOne({ email: username });
                if (user) {
                    console.log("El usuario ya existe!");
                    return done(null, false);
                }
                user = { first_name, last_name, email, age, password: (createHash(password)) };
                let result = userModel.create(user);
                if (result) {
                    return done(null, result);
                }
            } catch (error) {
                return done(null, error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });


    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            let user = await userModel.findOne({ email: username });
            if (!user) {
                console.log("Usuario inexistente!");
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                console.log("La contraseña es incorrecta!");
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(null, error);
        }
    }));
};

export default initializePassport;
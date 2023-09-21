import { userModel } from "./models/user.model.js";

class UserManager {

    async addUser(user) {
        /* try {
            if (user.email == "adminCoder@coder.com" && user.password == "adminCod3r123") {
                user.role = "admin";
            }
        }  */
        try {
            await userModel.create(user);
            console.log("Ususario creado correctamente!");
            return true;
        } catch (error) {
            console.log("Ha ocurrido un error al crear el usuario!");
            return false;
        }
    }

    async getUsers(params) {
        let { limit, page, query, sort } = params;
        limit = limit ? limit : 10;
        page = page ? page : 1;
        query = query || {};
        sort = sort ? sort == "asc" ? 1 : -1 : 0;
        let users = await userModel.find({}).lean();
        return users;
    }

    async loggin(user) {
        try {
            const userLogged = await userModel.findOne({email:user}) || null;
            if (userLogged) {
                console.log("Usuario logueado correctamente!");
                return user;
            }
            return false;
        } catch (error) {
            console.log("Se ha producido un error al loguear el usuario!");
            return false;
        }
    } 

    async restorePassword(user, pass) {
        try {
            const userLogged = await userModel.updateOne({email: user}, {password: pass}) || null;
            if(userLogged) {
                console.log("Contraseña actualizada correctamente!");
                return userLogged;
            }
        } catch (error) {
            console.log("Ha ocurrido un error al actualizar la contraseña!");
            return false;
        }
    } 

    /*     async getUsersById(id) {
            if (this.validateId(id)){
                return await userModel.findOne({_id:id}).lean() || null;
            } else {
                console.log("Usuario no encontrado!");
                return null; 
            }
        }
    
        validateId(id) {
            return id.length === 24 ? true : false;
        } */
}

export default UserManager;
import fs from "fs";

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "Products.json";
        this.createFile();
    }

    createFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }

    addProduct(product) {
        if (this.validateCode(product.code)) {
            console.log("Error! Ya existe un producto con este código!");

            return false;
        } else {
            const producto = {id:this.generateId(), title:product.title, description:product.description, code:product.code, price:product.price, status:product.status, stock:product.stock, category:product.category, thumbnails:product.thumbnails};
            this.products = this.getProducts();
            this.products.push(producto);
            this.saveProducts();
            console.log("Producto agregado correctamente!");

            return true;
        }
    }

    updateProduct(id, product) {
        this.products = this.getProducts();
        let pos = this.products.findIndex(item => item.id === id);

        if (pos > -1) {
            this.products[pos].title = product.title;
            this.products[pos].description = product.description;
            this.products[pos].code = product.code;
            this.products[pos].price = product.price;
            this.products[pos].status = product.status;
            this.products[pos].stock = product.stock;
            this.products[pos].category = product.category;
            this.products[pos].thumbnails = product.thumbnails;
            this.saveProducts();
            console.log("Producto actualizado!");

            return true;
        } else {
            console.log("No existe un producto con este ID!");

            return false;
        }
    }

    deleteProduct(id) {
        this.products = this.getProducts();
        let pos = this.products.findIndex(item => item.id === id);

        if (pos > -1) {
            this.products.splice(pos, 1); (0,1)
            this.saveProducts();
            console.log("El producto con el id #" + id + " se eliminó correctamente!");

            return true;
        } else {
            console.log("No existe un producto con este ID!");

            return false;
        }
    }

    getProducts() {
        let products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

        return products;
    }

    getProductById(id) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

        return this.products.find(item => item.id === id) || "No existe un producto con este ID!";
    }

    validateCode(code) {
        return this.products.some(item => item.code === code);
    }

    generateId() {
        let max = 0;
        let products = this.getProducts();

        products.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        });

        return max+1;
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
}

export default ProductManager;
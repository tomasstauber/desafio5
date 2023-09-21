import mongoose from "mongoose";
import moongosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: Array,
});

productSchema.plugin(moongosePaginate);

export const productModel = mongoose.model("products", productSchema);
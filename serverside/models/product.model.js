import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    pname:{type:String},
    price:{type:String},
    category:{type:String},
    description:{type:String},
    images:{type:Array}
})
export default mongoose.model.Products||mongoose.model("Product",productSchema)
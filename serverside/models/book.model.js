import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    sellerId:{type:String},
    buyerId:{type:String},
    date:{type:String},
    buyer:{type:Object},
    product:{type:Object}
})
export default mongoose.model.Book||mongoose.model("Book",bookSchema)
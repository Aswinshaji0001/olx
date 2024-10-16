import mongoose from "mongoose";
const wishlistSchema = new mongoose.Schema({
    buyerId:{type:String},
    products:{type:Object}
})
export default mongoose.model.Wishlists||mongoose.model("Wishlist",wishlistSchema)
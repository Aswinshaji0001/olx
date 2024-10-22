import { Router } from "express";
import {signIn,signUp,getProducts,getUser,editUser, addProducts, getSProduct, getProductDetails, editProducts, addWish, deleteWish, forgetPassword, otpCheck, resetPassword, setBook, getBooking, deleteBooking, deleteAccount, accountOTP,deleteProduct} from "./requestHandler.js";
import Auth from './middleware/Auth.js'

const router=Router();

router.route("/addproducts").post(addProducts)
router.route("/getproducts").get(Auth,getProducts)
router.route("/signup").post(signUp)
router.route("/signin").post(signIn)
router.route("/getuser/:id").get(getUser)
router.route("/edituser/:_id").put(editUser)
router.route("/getsproduct/:id").get(getSProduct)
router.route("/getproductdetails/:id").get(getProductDetails)
router.route("/editproduct/:_id").put(editProducts)
router.route("/wishlist").post(addWish)
router.route("/deletewish/:_id").delete(deleteWish)
router.route("/otp").post(forgetPassword);
router.route("/otpcheck").post(otpCheck);
router.route("/resetpassword").post(resetPassword);
router.route("/setbook").post(Auth,setBook);
router.route("/getbook/:sellerId").get(getBooking);
router.route("/deletebook").delete(deleteBooking);
router.route("/deleteac/:_id").post(deleteAccount);
router.route("/deleteotp").delete(accountOTP);
router.route("/deleteproducts/:_id").delete(deleteProduct);


export default router;
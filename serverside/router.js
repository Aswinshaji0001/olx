import { Router } from "express";
import {signIn,signUp,getProducts,getUser,editUser, addProducts, getSProduct} from "./requestHandler.js";
import Auth from './middleware/Auth.js'

const router=Router();

router.route("/addproducts").post(addProducts)
router.route("/getproducts").get(Auth,getProducts)
router.route("/signup").post(signUp)
router.route("/signin").post(signIn)
router.route("/getuser/:id").get(getUser)
router.route("/edituser/:_id").put(editUser)
router.route("/getsproduct/:_id").get(getSProduct)
export default router;
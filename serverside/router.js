import { Router } from "express";
import {signIn,signUp,getProducts,getUser,editUser} from "./requestHandler.js";
import Auth from './middleware/Auth.js'

const router=Router();

router.route("/getproducts").get(Auth,getProducts)
router.route("/signup").post(signUp)
router.route("/signin").post(signIn)
router.route("/getuser/:id").get(getUser)
router.route("/edituser/:_id").put(editUser)

export default router;
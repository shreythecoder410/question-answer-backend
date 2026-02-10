const express = require("express")
const AuthController = require("../controller/AuthController")
const upload = require("../middleware/multer")
const router = express.Router()

router.post("/register",upload.single("profileImage"), AuthController.register)
router.post("/verify-otp",AuthController.verifyOtp)

module.exports =router
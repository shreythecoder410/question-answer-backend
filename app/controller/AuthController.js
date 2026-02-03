const User = require("../models/user")
const AuthValidation = require("../validation/auth")
const bcrypt = require("bcryptjs")


class AuthController {
    async register(req, res) {
        try {

            const { error } = AuthValidation.register(req.body)

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.details[0].message
                })
            }


            const { name, email, password } = req.body

            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "User already exists"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const profileImage = req.file ? req.file.path : null

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                profileImage
            })

            return res.status(201).json({
                success: true,
                message: "user registration done",
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    profileImage: user.profileImage
                }
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

module.exports = new AuthController()
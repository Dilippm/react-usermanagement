const UserModel = require("../Model/UserModel");
const jwt = require('jsonwebtoken')
const fs = require("fs");
const path = require("path");
const AdminModel = require("../Model/AdminModel");
const maxAge = 3 * 24 * 60 * 80

const createToken = (id) => {
    return jwt.sign({ id }, "secret key", {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {
    let errors = { email: "", password: "" }

    if (err.message === "incorrect email") errors.email = "That email is not registered"
    if (err.message === "incorrect password") errors.password = "Password is incorrect"

    if (err.code === 11000) {
        errors.email = "Email is already registered"
        return errors
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.create({ email, password })
        const token = createToken(user._id)
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        })
        res.status(201).json({ user: user._id, created: true })
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err)
        res.json({ errors, created: false })
    }
}
module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.login(email, password)
        console.log(user)
        const token = createToken(user._id)
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        })
        res.status(200).json({ user: user._id, created: true, email: user.email, imageUrl: user.image })
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err)
        res.json({ errors, created: false })
    }
}

module.exports.updateImage = async (req, res, next) => {
    try {

        const userId = req.body.userId
        console.log("uuuuusrer banno"+userId);
        
        const imageUrl = req.file.filename
        const alreadyImage = await UserModel.findOne({ _id: userId })
        console.log(alreadyImage.image)

        if(alreadyImage.image !== undefined) {
            fs.unlink(path.join(__dirname, "../../react-learning-client/public/images/", alreadyImage.image), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("image deleted")
                }
            })
        }

        const image = await UserModel.updateOne({ _id: userId }, { $set: { image: imageUrl } }).then((res) => {
            console.log(res)
        })
        // console.log(image)
        res.status(201).json({ updated: true, imageUrl: imageUrl })


    } catch (err) {
        console.log(err)
        const errors = handleErrors(err)
        res.json({ errors, created: false })
    }
}

// -------------- ADMIN --------------------

module.exports.adminLogin = async (req, res, next) => {
    try {

        const { username, password } = req.body
        const admin = await AdminModel.findOne({ username: username })
        if (admin === null) {
            console.log("Username wrong")
            res.json({ created: false, message: "Incorrect Username" })
        } else {
            console.log(admin)
            if (admin.password === password) {

                const token = createToken(admin._id)
                res.cookie("adminjwt", token, {
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: maxAge * 1000
                })

                res.status(200).json({ created: true, adminId: admin._id })

            } else {
                console.log("Password is wrong")
                res.json({ created: false, message: "incorrect Password" })
            }
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {

        const allUser = await UserModel.find({})
        // console.log(allUser)
        res.status(200).json({ data: allUser })

    } catch (error) {
        console.log(error)
    }
}

module.exports.editUser = async (req, res, next) => {
    try {

        const { userId, userEmail } = req.body
        console.log(req.body)
        console.log(userId, userEmail)
        await UserModel.updateOne({ _id: userId }, { $set: { email: userEmail } })
        res.status(201).json({ update: true })

    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {

        const userId = req.params.id
        await UserModel.deleteOne({ _id: userId }).then(() => {
            res.status(200).json({ deleted: true })
        })

    } catch (error) {
        console.log(error)
    }
}
const { register, login, updateImage, adminLogin, getAllUsers, editUser, deleteUser } = require('../Controllers/AuthController')
const { checkUser, checkAdmin } = require('../Middlewares/AuthMiddlewares')
const router = require('express').Router()
const upload = require("../Middlewares/multer")


router.post('/', checkUser)
router.post('/register', register)
router.post('/login', login)
router.post('/profile', upload.single("image"), updateImage)

// ----- ADMIN -----

router.post('/admin/login', adminLogin)
router.post('/admin', checkAdmin)
router.get("/getallusers", getAllUsers)
router.post("/admin/adduser", register)
router.post("/admin/edit-user", editUser)
router.post("/admin/delete-user/:id",deleteUser)


module.exports = router
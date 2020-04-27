const router = require("express").Router();
const check = require("express-validator").check
const multer = require("multer")

const adminController = require("../controllers/admin.controller");
const adminGuard = require("./guards/adminGuards")

router.get("/add",adminGuard,adminController.getAdd)

router.post("/add",
adminGuard,
multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"images");
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now() + "-" + file.originalname);
        }
    })
}).single("image"),
check("name")
    .not()
    .isEmpty()
    .withMessage("name is required"),
check("price")
    .not()
    .isEmpty()
    .withMessage("price is required"),
check("description")
    .not()
    .isEmpty()
    .withMessage("description is required"),
check("category")
    .not()
    .isEmpty()
    .withMessage("category is required"),
check("image").custom((value, { req }) => {
    if (req.file) return true;
    else throw "image is required";
    }),
adminController.postAdd)
module.exports = router ;

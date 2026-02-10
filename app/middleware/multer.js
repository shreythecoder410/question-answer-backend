const fs = require("fs")
const multer = require("multer")


const FILE_TYPE_MAP={
    "image/png":"png",
    "image/jpg":"jpg",
    "image/jpeg":"jpeg"
}


const uploadPath = "uploads/profile"
if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath,{recursive:true})
}


const storage= multer.diskStorage({
    destination: uploadPath,
    filename:(req,file,cb) =>{
        const extension = FILE_TYPE_MAP[file.mimetype]
        if(!extension){
            return cb(new Error("Invalid image type"),false)
        }
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({storage})

module.exports = upload
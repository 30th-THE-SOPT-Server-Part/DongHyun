import multer from "multer";

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.bucketName,
    })
})
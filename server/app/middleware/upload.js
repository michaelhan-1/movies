const multer = require("multer");
const util = require("util");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imgs");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});
const uploadFile = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("poster");
uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;

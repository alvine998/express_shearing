const multer = require('multer');
const fs = require('fs');

// di esmodule gk bisa mke __dirname, maka buat const berikut

module.exports = (app) =>{
    const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "resources/static/assets/uploads/");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: Storage });

app.post("/uploads", upload.single("image"), (req, res) => {
  // console.log("file", req.files);
  // console.log("body", req.body);
  res.status(200).send({
    msg: "success",
    info: req.file.filename,
  });
});

app.delete("/delete/:imageName", (req, res) => {
    
  if (!req.params) {
    return res.status(500).json({
      msg: "params undefined",
    });
  } else {
    const fileExist = fs.existsSync(`resources/static/assets/uploads/${req.params.imageName}`);
    if (fileExist) {
      fs.unlinkSync(`resources/static/assets/uploads/${req.params.imageName}`);
      // return res.status(200).json({
      //   fileExist,
      // });
      res.status(200).send({ msg: "file dihapus" });
    } else {
      res.status(404).json({ msg: "file doesnt exist" });
      // res.status(404).send(fileExist);
    }
  }
});}
const Order = require("../models/order.model.js");
const uploadFileMiddleware = require("../middleware/upload");
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");

// Create and Save a new Note
exports.create = (req, res) => {
  // Create a Note
  const order = new Order({
    namapt: req.body.namapt,
    no_po: req.body.no_po,
    custid: req.body.custid,
    alamatpt: req.body.alamatpt,
    detorderid: req.body.detorderid,
    status: req.body.status,
    status_material: req.body.status_material,
    status_produksi: req.body.status_produksi,
    status_pembayaran: req.body.status_pembayaran,
    status_pengiriman: req.body.status_pengiriman,
    image: "",
    image_tf:"",
    image_pengiriman:""
  });

  console.log(order);

  order
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    });
};

// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
  Order.find()
    .sort({ createdAt: -1 })
    .then((orders) => {
      res.send(orders);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
  await Order.aggregate(
    [
      { $match: { _id: mongoose.Types.ObjectId(req.params.orderId) } },
      {
        $lookup: {
          from: "detailorders",
          localField: "detorderid",
          foreignField: "_id",
          as: "detailorders",
        },
      },
      //   { $unwind: "$detail_order" },
      {
        $project: {
          detorderid: 0,
        },
      },
      { $sort: { _id: 1 } },
    ],
    function (err, data) {
      if (err || data === null) {
        res.json({
          msg: "Gagal mendapatkan data",
          err,
        });
      } else {
        res.json(data[0]);
      }
    }
  );

  // .populate('detorderid')
  // .then(order => {
  //     if(!order) {
  //         return res.status(404).send({
  //             message: "Order not found with id " + req.params.orderId
  //         });
  //     }
  //     res.send(order);
  // }).catch(err => {
  //     console.log('err',err)
  //     if(err.kind === 'ObjectId') {
  //         return res.status(404).send({
  //             message: "Order not found with id " + req.params.orderId
  //         });
  //     }
  //     return res.status(500).send({
  //         message: "Error retrieving customer with id " + req.params.orderId,

  //     });
  // });
};

// Find a single note with a noteId
exports.findOneCust = (req, res) => {
  const custid = req.params.custid;
  Order.find({ custid: custid })
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with id " + req.params.custid,
        });
      }
      res.send(order);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Order not found with id " + req.params.custid,
        });
      }
      return res.status(500).send({
        message: "Error retrieving customer with id " + req.params.custid,
      });
    });
};

// Update a customer identified by the custid in the request
exports.update = (req, res) => {
    console.log(`req.body`, req.body)
  // Find note and update it with the request body
  Order.findByIdAndUpdate(
    req.params.orderId,
    //      {
    //     namapt: req.body.namapt,
    //     custid: req.body.custid,
    //     alamatpt: req.body.alamatpt,
    //     detorderid: req.body.detorderid,
    //     status: req.body.status,
    //     status_material: req.body.status_material,
    //     status_produksi: req.body.status_produksi,
    //     status_pembayaran: req.body.status_pembayaran,
    //     status_pengiriman: req.body.status_pengiriman,
    //     image:req.body.image
    // }
    req.body,
    { new: true }
  )
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      res.send(order);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      return res.status(500).send({
        message: "Error updating order with id " + req.params.orderId,
      });
    });
};

// Delete a customer with the specified custId in the request
exports.delete = (req, res) => {
  Order.findByIdAndRemove(req.params.orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      res.send({ message: "Order deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Order not found with id " + req.params.orderId,
        });
      }
      return res.status(500).send({
        message: "Could not delete order with id " + req.params.orderId,
      });
    });
};

exports.deleteAll = (req, res) => {
  Order.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Delete Successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

exports.upload = async (req, res) => {
  // const Storage = multer.diskStorage({
  //     destination(req, file, callback) {
  //       callback(null, "resources/static/assets/uploads/");
  //     },
  //     filename(req, file, callback) {
  //       callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  //     },
  //   });
  //   const upload = multer({ storage: Storage }).single("image")
  //   res.status(200).send({
  //     msg: "success",
  //     info: req.file.filename,
  //   });
  // try {
  //     await uploadFile(req, res);
  //     if (req.file == undefined) {
  //       return res.status(400).send({ message: "Please upload a file!" });
  //     }
  //     res.status(200).send({
  //       message: "Uploaded the file successfully: " + req.file.originalname,
  //     });
  //   } catch (err) {
  //     res.status(500).send({
  //       message: `Could not upload the file: ${req.file.originalname}. ${err}`,
  //     });
  //   }
};

exports.download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "could not download the file" + err,
      });
    }
  });
};

exports.getListFiles = (req, res) => {
  const baseUrl = "http://localhost:3000/upload/files/";
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};

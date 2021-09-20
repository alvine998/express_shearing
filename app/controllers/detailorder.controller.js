const DetailOrder = require('../models/detailorder.model');

// Create and Save a new Note
exports.create = (req, res) => {

    // Create a Note
    const detailorder = new DetailOrder({
        custid: req.body.custid,
        nama_item: req.body.nama_item,
        jumlah_item: req.body.jumlah_item,
        harga_satuan: req.body.harga_satuan,
        total_harga: req.body.total_harga
    });

    // Save Customer in the database
    detailorder.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Detail Order."
        });
    });
};

// // Create another one
// exports.createForOrder = (req, res) => {

//     // Create a Note
//     const detailorder = new DetailOrder({
//         nama_item: req.body.nama_item,
//         jumlah_item: req.body.jumlah_item,
//         harga_satuan: req.body.harga_satuan,
//         total_harga: req.body.total_harga
//     });

//     // Save Customer in the database
//     detailorder.save()
//     .then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while creating the Detail Order."
//         });
//     });
// };

// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
    DetailOrder.find()
    .then(detailorder => {
        res.send(detailorder);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving detail order."
        });
    });
};

// Retreiviing by customer id
exports.findOneCustomerId = (req, res) => {
    const custId = req.params.custId; 
    DetailOrder.findOne({"custid":custId})
    .then(detailorder => {
        if(!detailorder) {
            return res.status(403).send({
                message: "Customer not found with id " + req.params.custId
            });            
        }
        res.send(detailorder);
    }).catch(err => {
        return res.status(500).send({
            err: "Error retrieving customer with id " + req.params.custId
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    DetailOrder.findById(req.params.detorderId)
    .then(detailorder => {
        if(!detailorder) {
            return res.status(404).send({
                message: "Detail Order not found with id " + req.params.detorderId
            });            
        }
        res.send(detailorder);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Detail Order not found with id " + req.params.detorderId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving detail order with id " + req.params.detorderId
        });
    });
};

// Update a customer identified by the custid in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    DetailOrder.findByIdAndUpdate(req.params.detorderId, {
        custid: req.body.custid,
        nama_item: req.body.nama_item,
        jumlah_item: req.body.jumlah_item,
        harga_satuan: req.body.harga_satuan,
        total_harga: req.body.total_harga
    }, {new: true})
    .then(detailorder => {
        if(!detailorder) {
            return res.status(404).send({
                message: "Detail order not found with id " + req.params.detorderId
            });
        }
        res.send(detailorder);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Detail order not found with id " + req.params.detorderId
            });                
        }
        return res.status(500).send({
            message: "Error updating detail order with id " + req.params.detorderId
        });
    });
};

// Delete a customer with the specified custId in the request
exports.delete = (req, res) => {
    DetailOrder.findByIdAndRemove(req.params.detorderId)
    .then(detailorder => {
        if(!detailorder) {
            return res.status(404).send({
                message: "Detail order not found with id " + req.params.detorderId
            });
        }
        res.send({message: "Detail order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Detail order not found with id " + req.params.detorderId
            });                
        }
        return res.status(500).send({
            message: "Could not delete detail order with id " + req.params.detorderId
        });
    });
};
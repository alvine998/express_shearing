const Invoice = require('../models/invoice.model');
const tbOrder = require('../models/order.model');
const tbCustomer = require('../models/customer.model');


// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note


    
             const tanggal = tbOrder.findById(req.params.orderId);

             const invoice = new Invoice({
                orderid: req.body.orderid, 
                karyawanid: req.body.karyawanid,
                total_biaya: req.body.total_biaya
            });
            console.log(invoice);
            invoice.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Invoice."
                });
            });
    

    // const orderID = req.params.orderid;
   


    // console.log("test , " , req.body.orderid);


    // Save invoice in the database
};

// Retrieve and return all invoices from the database.
exports.findAll = (req, res) => {
    Invoice.find()
    .then(invoice => {
        res.send(invoice);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving invoice."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Invoice.findById(req.params.invId)
    .then(invoice => {
        if(!invoice) {
            return res.status(404).send({
                message: "Invoice not found with id " + req.params.invId
            });            
        }
        res.send(invoice);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Invoice not found with id " + req.params.invId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Invoice with id " + req.params.invId
        });
    });
};

// Update a invoice identified by the invId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Invoice.findByIdAndUpdate(req.params.invId, {
        orderid: req.body.orderid, 
        karyawanid: req.body.karyawanid,
        total_biaya: req.body.total_biaya
    }, {new: true})
    .then(invoice => {
        if(!invoice) {
            return res.status(404).send({
                message: "Invoice not found with id " + req.params.invId
            });
        }
        res.send(invoice);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Invoice not found with id " + req.params.invId
            });                
        }
        return res.status(500).send({
            message: "Error updating Invoice with id " + req.params.invId
        });
    });
};

// Delete a invoice with the specified invId in the request
exports.delete = (req, res) => {
    Invoice.findByIdAndRemove(req.params.invId)
    .then(invoice => {
        if(!invoice) {
            return res.status(404).send({
                message: "Invoice not found with id " + req.params.invId
            });
        }
        res.send({message: "Invoice deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Invoice not found with id " + req.params.invId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Invoice with id " + req.params.invId
        });
    });
};
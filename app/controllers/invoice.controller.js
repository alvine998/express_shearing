const Invoice = require('../models/invoice.model');
const tbOrder = require('../models/order.model');
const tbCustomer = require('../models/customer.model');


// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note


    
             const tanggal = tbOrder.findById(req.params.orderId);

             const invoice = new Invoice({
                orderid: req.body.orderid, 
                nama_karyawan: req.body.nama_karyawan,
                custid: req.body.custid,
                invoice_no: req.body.invoice_no,
                tanggal: req.body.tanggal,
                nama_pt: req.body.nama_pt,
                alamat_pt: req.body.alamat_pt,
                total_harga: req.body.total_harga,
                ppn: req.body.ppn,
                total_biaya: req.body.total_biaya,
                status: req.body.status,
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

// Find a single note with a noteId
exports.findOrderOne = (req, res) => {
    const orderId = req.params.orderId;
    Invoice.findOne({'orderid': orderId})
    .then(invoice => {
        if(!invoice) {
            return res.status(404).send({
                message: "Invoice not found with order id " + req.params.orderId
            });            
        }
        res.send(invoice);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Invoice not found with order id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Invoice with order id " + req.params.orderId
        });
    });
};

// Find a single note with a noteId
exports.findInvoice = (req, res) => {
    const custId = req.params.custId;
    Invoice.find({'custid': custId})
    .then(invoice => {
        if(!invoice) {
            return res.status(404).send({
                message: "Invoice not found with order id " + req.params.custId
            });            
        }
        res.send(invoice);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Invoice not found with order id " + req.params.custId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Invoice with order id " + req.params.custId
        });
    });
};

// Update a invoice identified by the invId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Invoice.findByIdAndUpdate(req.params.invId, {
        orderid: req.body.orderid, 
        nama_karyawan: req.body.nama_karyawan,
        custid: req.body.custid,
        invoice_no: req.body.invoice_no,
        tanggal: req.body.tanggal,
        nama_pt: req.body.nama_pt,
        alamat_pt: req.body.alamat_pt,
        total_harga: req.body.total_harga,
        ppn: req.body.ppn,
        total_biaya: req.body.total_biaya,
        status: req.body.status,

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
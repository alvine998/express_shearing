const Order = require('../models/order.model.js');


// Create and Save a new Note
exports.create = (req, res) => {
    

    // Create a Note
    const order = new Order({
        namapt: req.body.namapt, 
        custid: req.body.custid,
        alamatpt: req.body.alamatpt,
        detorderid: req.body.detorderid,
        status: req.body.status
    });

    console.log(order);

    order.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Customer."
        });
    });
};


// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving customer with id " + req.params.orderId
        });
    });
};

// Update a customer identified by the custid in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
        namapt: req.body.namapt, 
        custid: req.body.custid,
        alamatpt: req.body.alamatpt,
        detorderid: req.body.detorderid,
        status: req.body.status,
    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error updating order with id " + req.params.orderId
        });
    });
};

// Delete a customer with the specified custId in the request
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send({message: "Order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Could not delete order with id " + req.params.orderId
        });
    });
};
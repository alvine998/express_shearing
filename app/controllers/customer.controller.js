const Customer = require('../models/customer.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const tokenSecret = '123456';


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Customer email can not be empty"
        });
    }

    // Create a Note
    const customer = new Customer({
        nama: req.body.nama, 
        email: req.body.email,
        nohp: req.body.nohp,
        namapt: req.body.namapt,
        alamatpt: req.body.alamatpt,
        password: req.body.password,
        session_order: req.body.session_order
    });

    // Save Customer in the database
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Customer."
        });
    });
};

exports.loginOne = (req,res) => {
    // function generateToken(customer){
    //     return jwt.sign({data: customer}, tokenSecret, {expiresIn: '24h'})
    // }
    Customer.findOne({email: req.body.email})
    .then(customer => {
        if(!customer) {
            res.status(400).json({error: "email not found"})}
        else{
            
            if(req.body.password == customer.password){
                res.status(200).json({message: "password ok"})
            }
            else {
                res.status(400).json({error: "wrong email or password"})
            }
        }
        console.log('hello', customer)
    })
}

// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving customers."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Customer.findById(req.params.custId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.custId
            });            
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.custId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving customer with id " + req.params.custId
        });
    });
};

// Find By email
// Find a single note with a noteId
exports.findOneEmail = (req, res) => {
    const emails = req.params.emailId; 
    Customer.findOne({"email":emails})
    .then(customer => {
        if(!customer) {
            return res.status(403).send({
                message: "Customer not found with id " + req.params.emailId
            });            
        }
        res.send(customer);
    }).catch(err => {
        return res.status(500).send({
            err: "Error retrieving customer with id " + req.params.emailId
        });
    });
};

// Update a customer identified by the custid in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.email) {
    //     return res.status(400).send({
    //         message: "Customer email can not be empty"
    //     });
    // }

    // Find note and update it with the request body
    Customer.findByIdAndUpdate(req.params.custId, {
        nama: req.body.nama, 
        email: req.body.email,
        nohp: req.body.nohp,
        namapt: req.body.namapt,
        alamatpt: req.body.alamatpt,
        password: req.body.password,
        session_order: req.body.session_order
    }, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.custId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.custId
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.custId
        });
    });
};

// Delete a customer with the specified custId in the request
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.custId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.custId
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.custId
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.custId
        });
    });
};

exports.deleteAll = (req,res) => {
    Customer.deleteMany({})
    .then(
        data => {
            res.send({
                message: `${data.deletedCount} Delete Successfully` 
            });
        }
    )
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
    });
}
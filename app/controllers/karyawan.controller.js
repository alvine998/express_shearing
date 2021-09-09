const Karyawan = require('../models/karyawan.model.js');
const bcrypt = require('bcryptjs');

// Create and Save a new Karyawan
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Karyawan email can not be empty"
        });
    }

    // Create a Karyawan
    const karyawan = new Karyawan({
        nama: req.body.nama, 
        email: req.body.email,
        alamat: req.body.alamat,
        password: req.body.password,
        jabatan: req.body.jabatan,
        status: req.body.status,
    });

    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(karyawan.password,salt,(err,hash) => {
            if(err) throw err;
                karyawan.password = hash;
                karyawan.save()
                    .then(karyawan => res.json(karyawan))
                    .catch(err => console.log(err))
                return res.json(karyawan);
        })
    })

    // Save Karyawan in the database
    karyawan.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Karyawan."
        });
    });
};

// Retrieve and return all karyawans from the database.
exports.findAll = (req, res) => {
    Karyawan.find()
    .then(karyawan => {
        res.send(karyawan);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving karyawans."
        });
    });
};

// Find a single karyawan with a karyId
exports.findOne = (req, res) => {
    Karyawan.findById(req.params.karyId)
    .then(karyawan => {
        if(!karyawan) {
            return res.status(404).send({
                message: "Karyawan not found with id " + req.params.karyId
            });            
        }
        res.send(karyawan);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Karyawan not found with id " + req.params.karyId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving karyawan with id " + req.params.karyId
        });
    });
};

// Update a karyawan identified by the custid in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Karyawan email can not be empty"
        });
    }

    // Find note and update it with the request body
    Karyawan.findByIdAndUpdate(req.params.karyId, {
        nama: req.body.nama, 
        email: req.body.email,
        alamat: req.body.alamat,
        password: req.body.password,
        jabatan: req.body.jabatan,
        status: req.body.status,
    }, {new: true})
    .then(karyawan => {
        if(!karyawan) {
            return res.status(404).send({
                message: "Karyawan not found with id " + req.params.karyId
            });
        }
        res.send(karyawan);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Karyawan not found with id " + req.params.karyId
            });                
        }
        return res.status(500).send({
            message: "Error updating karyawan with id " + req.params.karyId
        });
    });
};

// Delete a karyawan with the specified karyId in the request
exports.delete = (req, res) => {
    Karyawan.findByIdAndRemove(req.params.karyId)
    .then(karyawan => {
        if(!karyawan) {
            return res.status(404).send({
                message: "Karyawan not found with id " + req.params.karyId
            });
        }
        res.send({message: "Karyawan deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Karyawan not found with id " + req.params.karyId
            });                
        }
        return res.status(500).send({
            message: "Could not delete karyawan with id " + req.params.karyId
        });
    });
};
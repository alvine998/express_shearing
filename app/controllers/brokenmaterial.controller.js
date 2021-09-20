const Material = require('../models/brokenmaterial.model');


// Create and Save a new Note
exports.create = (req, res) => {

    // Create a Note
    const material = new Material({
        nama_material: req.body.nama_material, 
        jumlah_material: req.body.jumlah_material,
        custid: req.body.custid,
        masalah: req.body.masalah
    });

    // Save Masalah in the database
    material.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Material."
        });
    });
};

// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
    Material.find()
    .then(materials => {
        res.send(materials);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving materials."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Material.findById(req.params.matId)
    .then(material => {
        if(!material) {
            return res.status(404).send({
                message: "Material not found with id " + req.params.matId
            });            
        }
        res.send(material);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Material not found with id " + req.params.matId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Material with id " + req.params.matId
        });
    });
};

// Update a customer identified by the custid in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Material.findByIdAndUpdate(req.params.matId, {
        nama_material: req.body.nama_material, 
        jumlah_material: req.body.jumlah_material,
        custid: req.body.custid,
        masalah: req.body.masalah
    }, {new: true})
    .then(material => {
        if(!material) {
            return res.status(404).send({
                message: "Material not found with id " + req.params.matId
            });
        }
        res.send(material);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Material not found with id " + req.params.matId
            });                
        }
        return res.status(500).send({
            message: "Error updating Material with id " + req.params.matId
        });
    });
};

// Delete a customer with the specified custId in the request
exports.delete = (req, res) => {
    Material.findByIdAndRemove(req.params.matId)
    .then(material => {
        if(!material) {
            return res.status(404).send({
                message: "Material not found with id " + req.params.matId
            });
        }
        res.send({message: "Material deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Material not found with id " + req.params.matId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Material with id " + req.params.matId
        });
    });
};
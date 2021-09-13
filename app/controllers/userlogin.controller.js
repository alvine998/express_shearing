const Customer = require('../models/customer.model');
const Karyawan = require('../models/karyawan.model');
const User = require('../models/customer.model' , require('../models/karyawan.model'))

exports.loginAkses = (req,res) => {
    Customer.findOne({email: req.body.email})
    .then(customer => {
        if(!customer) {
            res.status(400).json({error: "email not found"})}
        else{
            
            if(req.body.password == customer.password){
                res.status(200).json({message: "Login Customer Sukses"})
            }
            else {
                res.status(400).json({error: "wrong email or password"})
            }
        }
        console.log('hello', customer)
    })

    Karyawan.findOne({email_karyawan: req.body.email_karyawan})
    .then(karyawan => {
        if(!karyawan) {
            res.status(400).json({error: "email not found"})}
        else{
            
            if(req.body.password == karyawan.password){
                res.status(200).json({message: "Login Karyawan Sukses"})
            }
            else {
                res.status(400).json({error: "wrong email or password"})
            }
        }
        console.log('hello', karyawan)
    })
}

exports.findAll = (req,res) => {
    // User.find()
    // .then(users => {
    //     res.send(users);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while retrieving customers."
    //     });
    // });

    Customer.find({})
    .then(users => {
        res.send(users);
    })
}
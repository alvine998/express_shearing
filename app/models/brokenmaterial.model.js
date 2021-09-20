const mongoose = require('mongoose');

const MaterialSchema = mongoose.Schema({
    nama_material: String,
    jumlah_material: String,
    custid: {type: mongoose.Types.ObjectId, ref:'customer.model'},
    masalah: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Material', MaterialSchema);

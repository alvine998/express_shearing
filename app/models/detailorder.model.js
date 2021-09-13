const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const DetailOrderSchema = mongoose.Schema({
    nama_item: String,
    jumlah_item: Number,
    harga_satuan: Number,
    total_harga: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('DetailOrder', DetailOrderSchema);

const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const DetailOrderSchema = mongoose.Schema({
    custid: {type:ObjectId, ref:'customer.model'},
    nama_item: String,
    jumlah_item: Number,
    harga_satuan: Number,
    total_harga: Number,
    session_detail: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('DetailOrder', DetailOrderSchema);

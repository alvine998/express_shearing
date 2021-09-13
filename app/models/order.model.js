const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    namapt: String,
    custid: {type:ObjectId, ref:'customer'},
    alamatpt: String,
    detorderid: [{type:ObjectId, ref:'detailorder'}],
    status: {type: String, default:'Belum Verifikasi'} ,
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);

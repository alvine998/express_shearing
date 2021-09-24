const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    namapt: String,
    custid: {type:ObjectId, ref:'customer'},
    alamatpt: String,
    detorderid: [{type:ObjectId, ref:'detailorder'}],
    status: String ,
    status_material: String,
    status_produksi: String,
    status_pembayaran: String,
    status_pengiriman: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);

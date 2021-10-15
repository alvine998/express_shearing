const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
    namapt: String,
    no_po:Number,
    custid: {type:ObjectId, ref:'customers'},
    alamatpt: String,
    detorderid: [{type:ObjectId, ref:'detailorders.model'}],
    status: String ,
    status_material: String,
    status_produksi: String,
    status_pembayaran: String,
    status_pengiriman: String,
    image: String,
    image_tf:String,
    image_pengiriman:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);

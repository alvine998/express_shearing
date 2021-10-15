const mongoose = require('mongoose');
const {ObjectId } = mongoose.Schema;

const InvoiceSchema = mongoose.Schema({
    orderid: {type: ObjectId, ref:'order.model'},
    custid: {type: ObjectId, ref:'customer.model'},
    invoice_no: String,
    nama_karyawan: String,
    tanggal: Date,
    nama_pt: String,
    alamat_pt:String,
    total_harga: Number,
    ppn: Number,
    total_biaya: Number,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Invoice', InvoiceSchema);

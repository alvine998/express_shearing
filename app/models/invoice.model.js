const mongoose = require('mongoose');
const {ObjectId } = mongoose.Schema;

const InvoiceSchema = mongoose.Schema({
    orderid: {type: ObjectId, ref:'order.model'},
    karyawanid: {type: ObjectId, ref:'karyawan.model'},
    total_biaya: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Invoice', InvoiceSchema);

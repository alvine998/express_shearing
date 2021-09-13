const mongoose = require('mongoose');

const KaryawanSchema = mongoose.Schema({
    nama: String,
    email_karyawan: String,
    alamat: String,
    password: String,
    jabatan: String,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Karyawan', KaryawanSchema);

module.exports = (app) => {
    const karyawans = require('../controllers/karyawan.controller.js');

    // Create a new Note
    app.post('/karyawans', karyawans.create);

    // Retrieve all karyawans
    app.get('/karyawans', karyawans.findAll);

    // Retrieve a single Note with noteId
    app.get('/karyawans/:karyId', karyawans.findOne);

    // Update a Note with noteId
    app.put('/karyawans/:karyId', karyawans.update);

    // Delete a Note with noteId
    app.delete('/karyawans/:karyId', karyawans.delete);
}
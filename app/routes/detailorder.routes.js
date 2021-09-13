module.exports = (app) => {
    const detOrders = require('../controllers/detailorder.controller');

    // Create a new Note
    app.post('/detorders', detOrders.create);

    // Retrieve all detOrders
    app.get('/detorders', detOrders.findAll);

    // Retrieve a single Note with noteId
    app.get('/detorders/:detorderId', detOrders.findOne);

    // Update a Note with noteId
    app.put('/detorders/:detorderId', detOrders.update);

    // Delete a Note with noteId
    app.delete('/detorders/:detorderId', detOrders.delete);
}
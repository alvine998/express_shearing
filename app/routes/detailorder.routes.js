module.exports = (app) => {
    const detOrders = require('../controllers/detailorder.controller');

    // Create a new Note
    app.post('/detorders', detOrders.create);

    // Retrieve all detOrders
    app.get('/detorders', detOrders.findAll);

    // Retrieve a single Note with noteId
    app.get('/detorders/:detorderId', detOrders.findOne);

    // Retrieve a single Note with noteId
    app.get('/detorders/all/:detorderId', detOrders.findAllById);

    // Retrieve a single Note with custid
    app.get('/detorderss/:custId', detOrders.findOneCustomerId);

    // Retrieve a single Note with custid
    app.get('/detorderss/session/:sessionId', detOrders.findSession);

    // Update a Note with noteId
    app.put('/detorders/:detorderId', detOrders.update);

      // Update a Note with noteId
      app.put('/detorderss/session/:custId', detOrders.updateSession);

    // Delete a Note with noteId
    app.delete('/detorders/:detorderId', detOrders.delete);

    app.delete('/detorders', detOrders.deleteAll);

}
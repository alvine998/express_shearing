module.exports = (app) => {
    const orders = require('../controllers/order.controller');

    // Create a new Note
    app.post('/orders', orders.create);

    // Retrieve all orders
    app.get('/orders', orders.findAll);

    // Retrieve a single Note with noteId
    app.get('/orders/:orderId', orders.findOne);

    // Update a Note with noteId
    app.put('/orders/:orderId', orders.update);

    // Delete a Note with noteId
    app.delete('/orders/:orderId', orders.delete);
}
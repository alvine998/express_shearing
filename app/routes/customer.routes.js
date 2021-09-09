module.exports = (app) => {
    const customers = require('../controllers/customer.controller.js');

    // Create a new Note
    app.post('/customers', customers.create);

    // Retrieve all customers
    app.get('/customers', customers.findAll);

    // Retrieve a single Note with noteId
    app.get('/customers/:custId', customers.findOne);

    // Update a Note with noteId
    app.put('/customers/:custId', customers.update);

    // Delete a Note with noteId
    app.delete('/customers/:custId', customers.delete);
}
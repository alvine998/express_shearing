module.exports = (app) => {
    const customers = require('../controllers/customer.controller.js');
    const middleware = require('../middleware/auth.middleware');

    // Create a new Note
    app.post('/customers', customers.create);

    // Retrieve all customers
    app.get('/customers', customers.findAll);

    // Login
    app.get('/customers/jwt-test', middleware.verify, (req,res) => {res.status(200).json(req.customer)});

    app.post('/customers/login', customers.loginOne);
    // Retrieve a single Note with noteId
    app.get('/customers/:custId', customers.findOne);

    // Update a Note with noteId
    app.put('/customers/:custId', customers.update);

    // Delete a Note with noteId
    app.delete('/customers/:custId', customers.delete);
}
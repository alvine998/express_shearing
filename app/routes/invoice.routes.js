module.exports = (app) => {
    const invoices = require('../controllers/invoice.controller');

    // Create a new Note
    app.post('/invoices', invoices.create);

    // Retrieve all invoices
    app.get('/invoices', invoices.findAll);

    // Retrieve a single Note with noteId
    app.get('/invoices/:invId', invoices.findOne);

    // Retrieve a single Note with noteId
    app.get('/invoicess/:orderId', invoices.findOrderOne);
    app.get('/invoicesss/:custId', invoices.findInvoice);

    // Update a Note with noteId
    app.put('/invoices/:invId', invoices.update);

    // Delete a Note with noteId
    app.delete('/invoices/:invId', invoices.delete);
}
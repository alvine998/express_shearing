const multer = require('multer');
module.exports = (app) => {
    const orders = require('../controllers/order.controller');

    // Create a new Note
    app.post('/orders', orders.create);

    // Retrieve all orders
    app.get('/orders', orders.findAll);

    // Retrieve a single Note with noteId
    app.get('/orders/:orderId', orders.findOne);

    app.get('/orderss/:custid', orders.findOneCust);

    // Retrieve Image File
    app.get('/upload/files', orders.getListFiles);

    // Retrieve Image File
    // app.get('/upload/files/:name', orders.download);

    // Upload Image
    // app.post('/uploads', orders.upload);


    // Update a Note with noteId
    app.put('/orders/:orderId', orders.update);

    // Delete a Note with noteId
    app.delete('/orders/:orderId', orders.delete);

    app.delete('/orders', orders.deleteAll);
}
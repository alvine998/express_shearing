module.exports = (app) => {
    const materials = require('../controllers/brokenmaterial.controller');

    // Create a new Note
    app.post('/materials', materials.create);

    // Retrieve all customers
    app.get('/materials', materials.findAll);

    // Retrieve a single Note with noteId
    app.get('/materials/:matId', materials.findOne);

    // Update a Note with noteId
    app.put('/materials/:matId', materials.update);

    // Delete a Note with noteId
    app.delete('/materials/:matId', materials.delete);
}
module.exports = (app) => {
    const notes = require('../controllers/notes.controller.js');

    // Create a new Note
    app.post('/notes', notes.create);

    //Retrieve all Notes
    app.get('/notes', notes.retrieveAll)

    // Retrieve a Note with noteId
    app.get('/notes/:id', notes.retrieveOne);

    // Update a Note with noteId
    app.put('/notes/:id', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:id', notes.delete);
}
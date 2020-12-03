module.exports = (app) => {
    const notes = require('../controllers/notes-controller.js');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve a Note with noteId
    app.get('/notes/noteId', notes.read);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}
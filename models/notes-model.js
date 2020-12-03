const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    content: { type: String, required: true}
});

module.exports = mongoose.model('Note', NoteSchema);
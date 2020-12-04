const { resolveNaptr } = require('dns');
const Note = require('../models/notes.model.js');

exports.create = (req, res) => {
    if(!req.body.content){
        return res.status(400).send('Must create with non-empty content')
    }
    const note = new Note({
        content: req.body.content
    });

    note.save();
    res.send(note);
};

exports.retrieveAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send('Error retrieving notes')
    });
};

exports.retrieveOne = (req, res) => {
    var id = req.params.id;
    Note.findById(id)
    .then(note => {
        if(note === null) {
            return res.status(404).send('No note with id: ' + id)
        }
        res.send(note);
    }).catch(err => {
        res.status(500).send('Error retrieving note')
    })
};

exports.update = (req, res) => {
    if(!req.body.content){
        return res.status(400).send('Must update with non-empty content')
    } 
    var id = req.params.id;
    Note.findByIdAndUpdate(id, { content: req.body.content }, { new: true})
    .then(note => {
        if(note === null) {
            return res.status(404).send('No note with id: ' + id)
        }
         res.send(note);
     }).catch(err => {
         res.status(500).send('Error updating note')
     })
 };

exports.deleteAll = (req, res) => {
    if(Note.exists({})) {
        return res.status(400).send('No notes to be deleted')
    }
    Note.remove({})
    .then(num => {
        res.send("All notes deleted")
    }).catch(err => {
        res.status(500).send('Error deleting notes')
    })
};

exports.deleteOne = (req, res) => {
    var id = req.params.id;
    Note.findByIdAndDelete(id)
    .then(note => {
        if(note === null) {
            return res.status(404).send('No note with id: ' + id)
        }
         res.send('Note deleted')
    }).catch(err => {
        res.status(500).send('Error deleting note')
    })
 
};
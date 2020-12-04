const { resolveNaptr } = require('dns');
const Note = require('../models/notes-model.js');

exports.create = (req, res) => {
    const note = new Note({
        content: req.body.content
    });

    note.save();
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
         res.send(note);
     }).catch(err => {
         res.status(500).send('Error updating note')
     })
 };

exports.delete = (req, res) => {
    var id = req.params.id;
    Note.findByIdAndDelete(id)
    .then(note => {
         res.send('Note deleted')
    }).catch(err => {
        res.status(500).send('Error deleting note')
    })
 
};
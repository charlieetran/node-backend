const { ValidationError, DatabaseError } = require('../models/notes.model.js');
const Note = require('../models/notes.model.js');

exports.create = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send("Content must be non-empty");
    }

    //if nothing is found (or null is returned from model) then return null
    Note.createNote(req.body.content)
    .then(note => {
        res.send('Note created: ' + note);
    })
    .catch(err => {
        if(err instanceof DatabaseError) {
            return res.status(500).send(err.message);
        } else if(err instanceof ValidationError) {
            return res.status(400).send(err.message);
        } else {
            throw err;
        }
    })

};

exports.retrieveAll = (req, res) => {

    Note.findNotes()
    .then(notes => {
        res.send('Notes retrieved: ' + notes);
    }).catch(err =>{
        if(err instanceof DatabaseError) {
            return res.status(500).send(err.message);
        } else {
            throw err;
        } 
    })
        
};


exports.retrieveOne = (req, res) => {
    var id = req.params.id;    

    Note.findNote(id)
    .then(note => {
        if(note === null) {
            return res.send('Nothing found');
        }
        res.send('Note retrieved: ' + note.content);
    }).catch(err => {
        if(err instanceof ValidationError) {
            return res.status(404).send(err.message);
        } else if(err instanceof DatabaseError) {
            return res.status(500).send(err.message);
        } else {
            throw err;
        }
    })

};

exports.update = (req, res) => {
    if(!req.body.content){
        return res.status(400).send('Must update with non-empty content')
    } 
    var id = req.params.id;

    Note.updateNote(id, req.body.content)
    .then(note => {
        if(note === null) {
            return res.send('Nothing found');
        }
        res.send('Updated to: ' + note.content);
    }).catch(err => {
        if(err instanceof ValidationError) {
            return res.status(404).send(err.message);
        } else if(err instanceof DatabaseError) {
            return res.status(500).send(err.message);
        } else {
            throw err;
        }
    }) 
        
 };

exports.deleteAll = (req, res) => {


    Note.deleteNotes()
    .then(notes => {
        res.send("All notes deleted");
    }).catch(err => {
        if(err instanceof DatabaseError) {
            return res.status(500).send(err.message);
        } else {
            throw err;
        }
    }) 
        
};

exports.deleteOne = (req, res) => {
    var id = req.params.id;

    Note.deleteNote(id)
    .then(note => {
        res.send("Note deleted");
    }).catch(err => {
        if(err instanceof ValidationError) {
            return res.status(404).send(err.message);
        } else if(err instanceof DatabaseError) {
            return res.status(500).send(err.message);
        } else {
            throw err;
        }
    }) 
        
};

const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    content: { type: String, required: true}
});

const Note = mongoose.model('Note', NoteSchema)

// create functions to move out mongoose functions from controller to here
// create and handle custom errors

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseError";
    }
}

createNote = async (reqContent) => {
    if(!reqContent) {
        throw new ValidationError("No content given");
    }
  
    const note = new Note({
        content: reqContent
    });
    
    
    try{
        console.log("Try saving");
       await note.save()
     
    } catch(err){
        throw new DatabaseError("Problem saving note");
    }
    

    return note;
};


 findNotes = async () => {
    return Note.find()
    .catch(err => {
        throw err;
    })
    
};


findNote = async (id) => {
    return Note.findById(id)
    .then(note => {
        return note;
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            throw new ValidationError("invalid id")
        }
        throw new DatabaseError("Problem finding note")
    })


};

updateNote = async (id, reqContent) => {
    if(reqContent === null) {
        return new ValidationError("No content given");
    }
    return Note.findByIdAndUpdate(id, { content: reqContent }, { new: true, useFindAndModify: false})
    .then(note => {
        return note;
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            throw new ValidationError("invalid id")
        }
        throw new DatabaseError("Problem updating note")
    })

};

deleteNotes = async () => {
    return Note.deleteMany()
    .catch(err => {
        throw new DatabaseError("Problem deleting all notes");
    })
};

deleteNote = async (id) => {
    return Note.findByIdAndDelete(id)
    .then(note => {
        if(note === null) {
            throw new ValidationError("No note with id: " + id);
        } 
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            throw new ValidationError("invalid id")
        }
        throw new DatabaseError("Problem deleting note")
    })
        

};



module.exports = {
    DatabaseError: DatabaseError,
    ValidationError: ValidationError,
    Note: Note,
    createNote: createNote,
    findNotes: findNotes,
    findNote: findNote,
    updateNote: updateNote,
    deleteNotes: deleteNotes,
    deleteNote: deleteNote
}


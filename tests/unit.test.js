const Note = require('../models/notes.model.js');
const mongoose = require("mongoose");
const {it, expect, beforeAll } = require('@jest/globals');

const url = "mongodb://localhost:27017/notesdb"

describe('Note Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true }, (err) => {
      if(err){
        throw err;
      }
      console.log("Database connection status: " + mongoose.connection.readyState);
   })
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  
  // creates note but unable to save
  // saving error is likely because the db connection doesnt seem to be established?
  it('Successfully creates and saves note', async () => {
    noteContent = "hello, world"
    console.log("Database connection status: " + mongoose.connection.readyState);

    const result = await Note.createNote(noteContent);

    expect(result._id).toBeDefined();
    expect(result.content).toBe(noteContent);


  });

  it('Error creating empty note', async() => {
    noteContent = ""

    try {
      var result = await Note.createNote(noteContent);
    } catch(err) {
      expect(err).toBeTruthy();
      expect(err.name).toBe("ValidationError");
      expect(err.message).toBe("No content given");
    }
    
  });


  
});





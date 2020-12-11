
const Note = require('../models/notes.model.js');
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
//var MockMongoose = require('mock-mongoose').MockMongoose;
//var mockMongoose = new MockMongoose(mongoose);

const uri = "mongodb://localhost:27017/notesdb";

describe('Note Model Test', () => {
  
  beforeAll(async () => {
    jest.setTimeout(15000);
    console.log("Start beforeAll");

  //  mockMongoose.prepareStorage().then(() => {
    try{
      var connection = await mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true }, () =>{
        console.log("beforeAll db connection status: " + mongoose.connection.readyState);
      });
    } catch(err) {
      throw err;
    }
      connection.once('open', async() => {
        console.log("Connection Successful!");
      });
 //   });
/*
    if(mockMongoose.helper.isMocked() === true){
      console.log("is mocked");
    } else {
      console.log("not mocked")
    }
    */
    
    
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
   
    
    console.log("End beforeAll");
  });
    

  afterAll(async () => {
    console.log("Start afterAll");
    console.log("afterAll Db connection status: " + mongoose.connection.readyState);

    await mongoose.connection.close();
    console.log("afterAll close Db connection status: " + mongoose.connection.readyState);
    console.log("End afterAll");
  });
 
  //unable to save note
  it('Successfully creates and saves note', async () => {
    console.log("Start first test");
    noteContent = "hello, world"

    console.log("test1 Db connection status: " + mongoose.connection.readyState);

    try {
      console.log("Try creating");
      var result = await Note.createNote(noteContent);
    } catch(err) {
      throw err;;
    }
    

    expect(result._id).toBeDefined();
    expect(result.content).toBe(noteContent);
    console.log("End first test");
  });


  it('Error creating empty note', async() => {
    console.log("Start second test");
    noteContent2 = ""

    try {
      var result2 = await Note.createNote(noteContent2);
    } catch(err) {
      expect(err).toBeTruthy();
      expect(err.name).toBe("ValidationError");
      expect(err.message).toBe("No content given");
    }
    console.log("End second test");
  });


  
});





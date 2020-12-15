var Note = require('../models/notes.model.js')
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var MockMongoose = require('mock-mongoose').MockMongoose;
var mockMongoose = new MockMongoose(mongoose);

var Mutex = require('async-mutex').Mutex;
const mutex = new Mutex();


describe('Note Model Test', () => {
  
  
  beforeAll(async() => {
    console.log("Start beforeAll");
    jest.setTimeout(15000);
    const uri = "mongodb://localhost:27017/notesdb";
    console.log("before connection call");

    const release = await mutex.acquire();

    try {
    mockMongoose.prepareStorage().then(() => {
      console.log("call connection ");
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
          useCreateIndex: true }, (err) => {
          console.log("Database connection status: " + mongoose.connection.readyState);
        });
        mongoose.connection.on("open", async () => {
          console.log("Connected!")
        })
    });
    } finally {
        release();
    }
    
     

     
    
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

    if(mockMongoose.helper.isMocked() === true){
      console.log("Mongoose is mocked");
    } else {
      console.log("Mongoose is not mocked")
    }
    
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
      var result = await Note.createNote(noteContent, mongoose.connection);
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

/*
  it('read notes', async() => {
    console.log("Start third test");
    console.log("test3 Db connection status: " + mongoose.connection.readyState);
    var result3 = await Note.findNotes(mongoose.connection);
    console.log(result3);
    console.log("End third test");

  })
  */
});





const Note = require('../models/notes.model.js');
const controller = require('../controllers/notes.controller.js');
const mongoose = require('mongoose');
const axios = require('axios');
const { ValidationError, DatabaseError } = require('../models/notes.model.js');


jest.mock('axios');

async function postNote(content) {
    try {
      const notes = await axios.post('/notes');
      return notes;
    } catch (err) {
      return new Map();
    }
  }

describe("Send POST request", () => {
    afterEach(() => {
        jest.resetAllMocks();
      });

    it("Successfully sends a POST request", async () => {
        const data = { content: "hello, world" };
        const url = "/notes";

        axios.post = jest.fn().mockResolvedValue(data);
        const actualValue = await postNote("hello, world");

        expect(actualValue).toEqual(data);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(url);
        
        
    });

    

    it("Error in sending a POST request", async () => {
        const postErr = new ValidationError('No content given');
        const data = { content: ""};
        const url = "/notes";

        axios.post = jest.fn().mockRejectedValue(postErr);
        const actualValue = await postNote("");
        
        expect(actualValue).toEqual(new Map());
        expect(axios.post).toBeCalledWith(url);
        expect(axios.post).toHaveBeenCalledTimes(1);

    });
    

});
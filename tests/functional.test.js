const Note = require('../models/notes.model.js');
const controller = require('../controllers/notes.controller.js');
const mongoose = require('mongoose');
const axios = require('axios');


jest.mock('axios');

describe("Send POST request", () => {

    it("Successfully sends a POST request", async () => {
        const data = { content: "hello, world" };
        const url = "/notes";

        axios.post.mockResolvedValue(data);
        console.log(axios.post.mockResolvedValue(data));
        
 
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(url);
        
        
    });

    /*

    it("Error in sending a POST request", async () => {
        const data = { content: ""};

        axios.post.mockResolvedValue(data);
 
        expect(axios.post).toHaveBeenCalledTimes(1);

    });
    */

});
const notes = require('../controllers/notes.controller.js');
const app = require('../server.js')
const axios = require('axios')

jest.mock('axios');


it('should return notes', () => {
  const notes = [{content: 'test'}];
  const resp = {data: notes};
  axios.get.mockResolvedValue(resp);

  return notes.retrieveAll()
  .then(data => {
    expect(data).toEqual(notes)
  });
});

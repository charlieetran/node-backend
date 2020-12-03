const userRoutes = require('./users');
const notesRoutes = require('./notes-route.js');

const appRouter = (app, fs) => {

  app.get('/', (req, res) => {
    res.send('Backend Testing');
  });

  userRoutes(app, fs);
  notesRoutes(app, fs);
};

module.exports = appRouter;



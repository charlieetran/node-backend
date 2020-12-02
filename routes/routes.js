const appRouter = (app, fs) => {};

const userRoutes = require('./users');

const appRouter = (app, fs) => {

  app.get('/', (req, res) => {
    res.send('Backend Testing');
  });

  userRoutes(app, fs);
};

module.exports = appRouter;



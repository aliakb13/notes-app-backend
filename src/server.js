// eslint-disable-next-line import/no-extraneous-dependencies
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['http://notesapp-v1.dicodingacademy.com'],
      },
    },
  });

  server.route(routes);

  try {
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (err) {
    console.log(err);
  }
};

init();

const Koa = require('koa');

const env = process.env.NODE_ENV;
const isProd = env === 'production';
const APP_NAME = config.app.name;
const APP_PORT = config.app.port;
const CDN_HOST = config.cdn.host;

const app = new Koa();

// signing key for rotating credential system
app.keys = config.app.keys;

// extend context methods
app.use(require('./middleware/render')({
  filters: {
    js: name => (isProd ? `${CDN_HOST}/${cdn.js[name]}` : `/${name}`),
    css: name => (isProd ? `${CDN_HOST}/${cdn.css[name]}` : `/${name}`),
    json: obj => JSON.stringify(obj || {}),
  },
  noCache: !isProd,
  watch: !isProd,
  global: { isProd },
}));

app.listen(
  APP_PORT,
  () => logger.info(`${APP_NAME} is running, port:${APP_PORT}`),
);

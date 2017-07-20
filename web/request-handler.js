var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
// __dirname, '../archives/sites.txt'
const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.handleRequest = function (req, res) {
  let statusCode;

  if (req.method === 'GET') {
    if (req.url.charAt(0) === '/') {
      statusCode = 200;
    }
  }
  res.writeHead(statusCode, defaultCorsHeaders);
  res.end(archive.paths.list);
};



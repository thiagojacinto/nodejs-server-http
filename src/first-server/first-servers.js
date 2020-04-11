const http = require('http');

// Initial server config attributes:
const host = 'localhost';
const port = 8080;
var requestsCounting = 0;

/**
 * First request listener created; must returns a message.
 * @param {*} request   // Must be always the first parameter of a requestListener()
 * @param {*} response 
 */
function requestListener(request, response) {
  console.log(`[Req. ${requestsCounting}] - Simple requestListener() requested.`);
  requestsCounting++;
  
  response.writeHead(200);
  response.end(`I wanted to have just to give it to you! [Request n. ${requestsCounting}]`);
};
/** Instantiate a new server, with the created request listener.
 * 
 * - This server accepts HTTP requests and passes them on to our requestListener() function.
 */
const server = http.createServer(requestListener);
/**
 * Bind the created server to a network address.
 */
server.listen(port, host, () => {
  console.log(`Server running @ -> http://${host}:${port}`);
});
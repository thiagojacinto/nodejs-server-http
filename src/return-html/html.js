const http  = require('http');
const fs = require('fs').promises;

const host = "localhost";
const port = 8080;

let indexFile;

function returnHTML(request, response) {
  response.setHeader('Content-Type', 'text/html');  // informs at Header the type of response
  response.writeHead(200);  // Status of the response
  response.end(indexFile);
}

// Alerts server starting:
function alertServerStart() {
  console.log(`Server running @ -> http://${host}:${port}`);
}
// Instantiate server:
const server = http.createServer(returnHTML);
// '__dirname' gets the full path of the actual directory
fs.readFile(__dirname + '/index.html')
  .then(contents => {
    // That way loads 'index.html' information into a global variable 'indexFile'
    indexFile = contents;
    // NOW OPENS PORT LISTENER:
    server.listen(port, host, () => {
      alertServerStart();
    });
  })
  .catch( error => {
    console.error(`Failed to read file: ${error}`);
    process.exit(1);
  })
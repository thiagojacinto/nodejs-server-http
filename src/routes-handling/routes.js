const http = require('http');
const fs = require('fs').promises;

const host = "localhost";
const port = 8080;

/**
 * JSON To Do's list
 * - imported from a todos.json file.
 */
// import todos from './todos.json';
let todosList;
fs.readFile(__dirname + '/todos.json')
    .then(data => todosList = JSON.stringify(data));


/**
 * JSON Post's list
 * - imported from a post.json file.
 */

let postsList; 
fs.readFile(__dirname + '/posts.json')
    .then(data => postsList = JSON.stringify(data));

const logout = JSON.stringify(
  {
    message: 'You\'ve logged out. Thanks for using this app!',
  }
);

function requestListener(request, response) {
  response.setHeader('Content-Type', 'application/json');  // informs at Header the type of response

  switch (request.url) {
    /**
     * Case accessed localhost/todos
     */
    case '/todos':
      response.writeHead(200);
      response.end(todosList);
      break;
    /**
     * Case accessed localhost/posts
     */
    case '/posts':
      response.writeHead(200);
      response.end(postsList);
      break;
    /**
     * Case accessed localhost/posts
     */
    case '/logout':
      response.writeHead(200);
      response.end(logout)
      break;
    /**
     * DEFAULT:
     * - When route is none of the specified.
     */
    default:
      response.writeHead(403);
      response.end(JSON.stringify({error: "Resource not found."}));
  }
}

/**
 * Alerts server starting:
 */
function alertServerStart() {
  console.log(`Server running @ -> http://${host}:${port}`);
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  alertServerStart();
})
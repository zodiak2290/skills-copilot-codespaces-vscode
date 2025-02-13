// Create web server
// Create route to get comments
// Create route to post comments

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred: ' + err);
    } else {
      const comments = JSON.parse(data);
      res.send(comments);
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred: ' + err);
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);

      fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('An error occurred: ' + err);
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Test the server
// Send a GET request to /comments and check that you receive a response with status code 200 and the comments from comments.json
// Send a POST request to /comments with a new comment and check that you receive a response with status code 200 and the message 'Comment added'
// Send a GET request to /comments and check that you receive a response with status code 200 and the comments from comments.json, including the new comment
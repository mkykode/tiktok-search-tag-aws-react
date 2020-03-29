/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const Nightmare = require('nightmare');
// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

/**********************
 * Example get method *
 **********************/

app.get('/trending', function(req, res) {
  // let videosURLS = [
  //   {
  //     user: 'haileesteinfeld',
  //     id: '6808335348301696261',
  //     src:
  //       'https://v19.muscdn.com/cd124f269c7483a64ae75ec22b366e73/5e804822/video/tos/useast2a/tos-useast2a-ve-0068c003/b5e8d0c91a5942588eb0c8d6eed7da53/?a=1233&br=982&bt=491&cr=0&cs=0&dr=0&ds=3&er=&l=202003290102480101890730972C539D18&lr=tiktok_m&qs=0&rc=anRxN2Rrb3Q0czMzOjczM0ApMzZoZDY5aDs2N2k2PDY5ZGdmYDU1cHFkLnJfLS01MTZzc14xMi0xMl9gX2FjYmBhMDQ6Yw%3D%3D&vl=&vr='
  //   },
  //   {
  //     user: 'keemokazi',
  //     id: '6809106720191810821',
  //     src:
  //       'https://v16.muscdn.com/dd12abdf539513da76a6491ceba3f3dd/5e80484b/video/tos/useast2a/tos-useast2a-ve-0068c004/49f4f2e6873d4fec86d8a89c31bd7e5c/?a=1233&br=2784&bt=1392&cr=0&cs=0&dr=0&ds=3&er=&l=202003290102480101890730972C539D18&lr=tiktok_m&qs=0&rc=MzVobWUzanZmczMzMzczM0ApZzplZzc1NDw6N2loN2k8NWdebS4vNjVhcHNfLS1fMTZzcy82MDAvYTI1MmMuNDJfMTM6Yw%3D%3D&vl=&vr='
  //   }
  // ];
  const nightmare = Nightmare({ show: true });
  const selector = '.video-feed-item-wrapper';
  nightmare
    .goto('https://www.tiktok.com/trending')
    .wait('.video-feed-item-wrapper')
    .evaluate(selector => {
      // now we're executing inside the browser scope.
      const data = [];
      const nodes = document.querySelectorAll('.video-feed-item-wrapper');
      for (let node of nodes) {
        const pathArray = node.pathname.split('/');
        data.push({
          user: pathArray[1],
          id: pathArray[3],
          src: ''
        });
      }
      return data;
    }, selector) // <-- that's how you pass parameters from Node scope to browser scope
    .then(videosURLS => {
      res.json({ error: null, videosURLS });
    })
    .catch(error => {
      res.json({ error, videosURLS: null });
    })
    .end();
  // Add your code here
});

app.get('/trending/*', function(req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post('/trending', function(req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

app.post('/trending/*', function(req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put('/trending', function(req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

app.put('/trending/*', function(req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/trending', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/trending/*', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function() {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;

const express = require('express');
const fs = require('fs');
const axios = require('axios');
const router = express.Router();
//const shell = require('shelljs');

var videoInfos = function(item) {
  return ({title: item.snippet.title,
            by: item.snippet.channelTitle,
            id: item.id.videoId});
}

var searchResults = function(items) {
  var res = [];
  for (let idx = 0; idx < 5; idx++) {
    var infos = videoInfos(items[idx]);
    res.push(infos);
  }
  return (res);
};

const getHome = async (req, res, next) => {
    try {
      res.json({message: 'GET succesful'});
    } catch (e) {
      next(e);
    }
  };
  router
    .route('/api/v1/')
    .get(getHome);

const searchVideo = async (req, res, next) => {
    try {
      if (process.env.YT_KEY) {
        var name = req.body.name;
        axios.get(`${process.env.YT_REQ}?part=snippet&type=video&maxResults=5&videoEmbeddable=true&q=${name}&key=${process.env.YT_KEY}`)
        .then(result => {
          var results = searchResults(result.data.items);
          res.status(201);
          res.json(results);
        }).catch(e => {
          console.log(e);
        });
    } else {
      res.json("define env vars");
      res.status("500");
    }
    } catch (e) {
      next(e);
    }
  };
  router
    .route('/api/v1/search')
    .post(searchVideo);

const selectVideo = async (req, res, next) => {
    try {
      //shell.exec("../scripts/download.sh");
    } catch (e) {
      next(e);
    }
  };
  router
    .route('/api/v1/select')
    .post(selectVideo);


module.exports = router;
const express = require('express');
const fs = require('fs');
const axios = require('axios');
const router = express.Router();

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
        axios.get(`${YT_REQ}?part=snippet&type=video&maxResults=1&videoEmbeddable=true&q=${name}&key=${process.env.YT_KEY}`)
        .then(result => {
          var videoId = result.data.items[0].id.videoId;
          console.log(videoId);
          res.status(201);
          res.json("worked")
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

module.exports = router;
const express = require('express');
const searchService = require('../searches/search-service');

const router = express.Router();

router.post('/vn-search', (req, res) => {
  const keyword = req.body.keyword;
  searchService.vnSearch(keyword, (response) => {
    res.json(response);
  });
});

router.post('/standard-search', (req, res) => {
  const keyword = req.body.keyword;
  searchService.standardSearch(keyword, (response) => {
    res.json(response);
  });
});

module.exports = router;

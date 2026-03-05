const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { searchService } = param; 

router.get('/', (req, res) => {
  res.render('search');
});

router.get('/:name', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const results = data.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.content.toLowerCase().includes(q)
  );

  res.render('searchResults', { q, results });
});

    return router; 
};







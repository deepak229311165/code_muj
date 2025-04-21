// backend/routes/solutions.js

const express = require('express');
const router = express.Router();

// Example route: GET /api/solutions/
router.get('/', (req, res) => {
  res.json({ message: 'Solutions route is working!' });
});

// Example route: POST /api/solutions/
router.post('/', (req, res) => {
  const { problemId, solutionCode } = req.body;
  // You can add DB logic here later
  res.json({ message: 'Solution submitted!', data: { problemId, solutionCode } });
});

module.exports = router;

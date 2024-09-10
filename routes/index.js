const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('OOOPS These are not the routes your looking for!');
});

module.exports = router;
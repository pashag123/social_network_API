const router = require('express').Router();
const thoughtRoute = require('./thoughtRoute');
const userRoutes = require('./userRoute');

router.use('/thought', thoughtRoute);
router.use('/user', userRoutes);

module.exports = router;
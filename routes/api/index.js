const router = require('express').Router();
const courseRoutes = require('./thoughtRoute');
const studentRoutes = require('./userRoute');

router.use('/thought', thoughtRoute);
router.use('/user', userRoutes);

module.exports = router;
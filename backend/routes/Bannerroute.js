const express = require('express');
const router = express.Router();
const upload = require('../middleware/Upload');
const {addBanner, getAllBanner,deleteBannerById} = require('../controller/BannerProductCtrl');

router.post('/addBanner', upload.single('image'), addBanner);
router.get('/allBanner', getAllBanner);
router.delete('/deleteBanner/:id', deleteBannerById);

module.exports = router;
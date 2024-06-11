const mongoose = require('mongoose');

var bannerSchema = new mongoose.Schema(
    {
        image:{
            type: String,
        },
        categories:{
            type: String
        }
    }
);

module.exports = mongoose.model('Banner',bannerSchema );
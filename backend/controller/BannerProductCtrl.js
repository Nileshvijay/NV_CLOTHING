const BannerModel = require('../model/BannerModel');
const IMG_BASE_URL = 'http://localhost:8080/';

const addBanner = (req,res) =>{
    const {categories} = req.body;
    console.log(req.body);

    BannerModel.create({
        categories,
        image: IMG_BASE_URL + req.file.filename
    })
    .then(result => res.json({success: true, data:result}))
    .catch(err=>res.status(500).json({success:false,error:err.message}));
};

const getAllBanner = async(req,res) =>{
     try{
        const banner = await BannerModel.find({});
        res.json(banner);
        console.log(banner);
     }catch(error){
        console.error('Error fetching users:', error);
        res.status(500).json({error: 'Internal Server Error'});
     }
};

const deleteBannerById = async(req,res)=>{
    try{
        const delBanner = await BannerModel.findByIdAndDelete(req.params.id)
        if(!delBanner){
            return res.status(404).json({message:"Banner doesn't exist"})
        }
        res.json(delBanner)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {
    addBanner,
    getAllBanner,
    deleteBannerById
};
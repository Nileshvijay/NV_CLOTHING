const mongoose = require('mongoose')

const connection = async () =>{
    try{
         await mongoose.connect(process.env.MONGO_URL)
        .then((res) => {
            console.log("Mongodb database is Connected now")
        }).catch((err)=>{
            console.log("Mongodb database is not Connected now".err);
        })
    }
    catch(err){
        console.log("Mongodb database is not Connected now".err);
    }
}


module.exports = connection
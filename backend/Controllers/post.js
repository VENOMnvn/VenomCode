const { post } = require('../routes/routes');
const POSTS = require('./../MongoDB/postSchema');

const sharePost = async (req,res)=>{
    console.log(req.body);
    const {
        user,label,title,code
    } = req.body;

    if(user){

          try{
            const postCreationResponse = await POSTS.create({
                user,
                postCode:code,
                title,
                label
            });
            console.log(postCreationResponse);
            res.send({
                success:true,
                response:postCreationResponse
            })
          }catch(err){
            res.send({
                success:false,
                msg:err
            })
          }
            

    }else{
        res.send({
            success:false,
            msg:"User NOT Found"
        })
    }
}


const getPosts = async (req,res)=>{
    try{
        
        const page = req.query.page;
        const limit = req.query.limit;
        const response = await POSTS.find().limit(limit).skip(page);
        res.send(response);

    }catch(err){

    }
};

module.exports = {sharePost,getPosts};
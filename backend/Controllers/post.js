const { post } = require('../routes/routes');
const POSTS = require('./../MongoDB/postSchema');

const sharePost = async (req,res)=>{
    console.log(req.body);
    const {
        user,label,title,code
    } = req.body;

    if(user){

          try{
            console.log("User At Creation Post",user);
            const postCreationResponse = await POSTS.create({
                user,
                postCode:code,
                title,
                label
            });
           
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
        console.log(page,limit);
        const response = await POSTS.find().limit(limit).skip(page*limit);
        res.send(response);
        
    }catch(err){

    }
};

const addLike = async (req,res)=>{
    console.log(req.body);
    try{
        const post = await POSTS.findById(req.body.post);
        console.log(post);
        post.likes.push(req.body.user);
        await post.save();
    }
    catch(err){
        res.send(err);
    }
};


const postFilter = async (req,res)=>{
    const {filter} = req.body;
    try{
        const page = req.query.page;
        const limit = req.query.limit;
        console.log(page,limit);
        const response = await POSTS.find({label:{$in:filter}}).limit(limit).skip(page*limit);
        res.send(response);
    }catch(err){

    }
};

module.exports = {sharePost,getPosts,addLike,postFilter};
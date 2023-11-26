const User = require('../MongoDB/UserSchema');
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
            
            await User.findOneAndUpdate({username:user.username},{$push:{posts:postCreationResponse._id}});
            res.send({
                success:true,
                response:postCreationResponse
            })
            

          }catch(err){
            console.log(err);
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

const getPost = async (req,res)=>{
    try{
        const {postid} = req.body;
        console.log(req.body);
        const response = await POSTS.findById(postid);
        res.send({
            success:true,
            data : response
        });

    }catch(err){
        console.log(err);
        res.send({
            Error:err
        })
    }
};

const addLike = async (req,res)=>{
    console.log(req.body);
    try{
        const post = await POSTS.findById(req.body.post);
        console.log(post);
        post.likes.push(req.body.user);
        await post.save();
        res.send({
            success:true
        });
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

const setComment = async (req,res)=>{
    try{
        const {postid,user,commentText} = req.body;
        console.log("Comment recieved",req.body);
        const response = await POSTS.findByIdAndUpdate(postid,{$push:{comments:{comment:commentText,user}}}); 
        res.send(response);
    }
    catch(err){
        res.send({err:true});
    }

};

module.exports = {sharePost,getPosts,addLike,postFilter,setComment,getPost};
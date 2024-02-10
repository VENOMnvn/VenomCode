const User = require('../MongoDB/UserSchema');
const { post } = require('../routes/routes');
const POSTS = require('./../MongoDB/postSchema');
const Problems = require("./../MongoDB/QuestionSchema");
const Notification = require("./../MongoDB/NotificationSchema")

const PostNotificationHandler = async (PostCreator,users,post)=>{
    if(users){
        users.forEach(async user => {
            const userDB = await User.findOne({username:user});
            Notification.create({
                user : userDB._id,
                msg:'upload a post ',
                username:PostCreator.username,
                profilePicture:PostCreator.profilePicture,
                link:'/post/'+post._id,
                extra:post.title
            });
        });
    }
}
const addToQuestion = async (question,post)=>{
    try{
        await Problems.findByIdAndUpdate(question.questionID,{$push:{solutions:post._id}});
        return;
    }catch(err){
        console.log(err);
    }
}

const sharePost = async (req,res)=>{
    console.log(req.body);
    const {
        user,label,title,code,question
    } = req.body;

    if(user){
          try{
            console.log("User At Creation Post",user);

            const postCreationResponse = await POSTS.create({
                user,
                postCode:code,
                title,
                label,
                question
            });
            
            addToQuestion(question,postCreationResponse);
            const userDB = await User.findOneAndUpdate({username:user.username},{$push:{posts:postCreationResponse._id}});
            PostNotificationHandler(userDB,userDB.followers,postCreationResponse);

            res.send({
                success:true,
                response:postCreationResponse
            });

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
        const response = await POSTS.find().limit(limit).skip(page*limit).sort({createdAt:-1});
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

const createAddLikeNotifications = async (username,UserId,post)=>{
    const user = await User.findOne({username}).select('_id');
    const user2 = await User.findById(UserId);

    Notification.create({
        user:user._id,
        msg:"likes your post",
        username:user2.username,
        profilePicture:user2.profilePicture,
        extra:post.title,
        link:'/post/'+post._id
    });
    
};


const addLike = async (req,res)=>{

    try{
        const post = await POSTS.findById(req.body.post);
        console.log(post);
        post.likes.push(req.body.user);
        await post.save();
        createAddLikeNotifications(post?.user?.username,req.body.user,post);
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

const setCommentNotification = async (commentText,user,owner,post)=>{
    try{
        console.log("comment");
        const ress = await Notification.create({
            user:owner._id,
            msg:"comment on your post ' " + post.title+" '",
            username:user.username,
            profilePicture:user.profilePicture,
            link:'/post/'+post._id,
            extra:"' "+commentText+" '"
        });
        console.log(ress);
    }catch(err){
        console.log(err);
    }
}

const setComment = async (req,res)=>{
    try{
        const {postid,user,commentText} = req.body;
        const response = await POSTS.findByIdAndUpdate(postid,{$push:{comments:{comment:commentText,user}}}); 
        const owner = await User.findOne({username:response.user.username});
        setCommentNotification(commentText,user,owner,response);
        console.log(5);
        res.send(response);
    }
    catch(err){
        console.log(err);
        res.send({err:true});
    }
};

const savePost = async (req,res)=>{
    try{
        const {post,user} = req.body;
        const response = await User.findByIdAndUpdate(user,{$push:{savedpost:post}});
        res.send("OK");
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}

const unsavepost = async (req,res)=>{
    try{
        const {post,user} = req.body;
        const response = await User.findByIdAndUpdate(user,{$pull:{savedpost:post}});
        res.send({
            success:true
        });
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}

const PostLength  = async (req,res)=>{
    try{
        const data = await POSTS.count();
        res.send({
            count:data
        });
    }catch(e){
        console.log(e);
    }
}

module.exports = {sharePost,getPosts,addLike,postFilter,setComment,getPost,savePost,unsavepost,PostLength};
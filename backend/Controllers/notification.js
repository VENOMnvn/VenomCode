const Direct = require("../MongoDB/DirectNotification");
const User = require("../MongoDB/UserSchema");
const Notification = require("./../MongoDB/NotificationSchema");

const seenNotification = async (req,res)=>{
    try {
        const {userid} = req.query;
        console.log(req.query,userid);

        if(!userid){
            res.send("Invalid UserID");
            return;
        }
        else{

            await Notification.findOneAndUpdate({user:userid},{isSeen:true});
            await Notification.updateMany({user:userid},{isSeen:true});
;            res.send({
                success:true
            });
            return;

        }
    } catch (error) {
        console.log(error);
    }
};

const getNotification = async (req,res)=>{
    try {
        const {userId} = req.body;
        if(!userId){
            res.send("Invalid UserID");
        }
        else{
            const notifications = await  Notification.find({user:userId}).sort({createdAt:-1});
            
            res.send({
                success:true,
                notifications
            });

        }
    } catch (error) {
        console.log(error);
    }
}

const checknotification = async (req,res)=>{
    try {
        const {userId} = req.query;
        console.log(req.query);
        if(!userId){
            res.send("Invalid UserID");
        }
        else{
            console.log(userId);
            const notifications = await  Notification.find({user:userId,isSeen:false}); 
            res.send({
                success:true,
                notifications:notifications.length
            });
        }
    } catch (error) {
        console.log(error);
    }
}
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

const sendDirectNotification = async(to,username,profilePicture,msg)=>{
    try{
        const res = await Direct.create({
            to,
            username,
            profilePicture,
            msg
        });
        console.log("Direct send to "+to+" from "+username);
    }catch(err){
        console.log(err);
    }
}

const directNotification = async (req,res)=>{
    try{   
            const {user,msg} = req.body;  
            const userDB = await User.findOne({username:user});
            if(userDB){
                sendDirectNotification(userDB.followers,user,userDB.profilePicture,msg);
                res.send("sending");
            }else{
                res.send("invalid username");
            }
    }
    catch(err){
    }
}

const findDirects = async (req,res)=>{
    try{
        const {user,limit} = req.body;
        const resp = await Direct.find({to:{$in:user}}).sort({createdAt:-1}).limit(limit);
        res.send({resp});
    }
    catch(err){
        console.log(err);
        res.send({error:'find Directs Error encountered'});
    }
}


module.exports = {seenNotification,getNotification,checknotification,directNotification,findDirects};
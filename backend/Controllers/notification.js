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


module.exports = {seenNotification,getNotification,checknotification};
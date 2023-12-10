const Conversation = require("../MongoDB/ConversationSchema");
const Message = require("../MongoDB/Message");
const User = require("./../MongoDB/UserSchema");

const getConversations = async (req, res) => {
  try {
    const { id } = req.headers;
    console.log(id);
    const conversations = await Conversation.find({ users: id }).populate(
      "users",
      "profilePicture -_id firstname lastname username"
    );

    res.send({ success: true, conversations });
  } catch (err) {
    console.log(err);
  }
};

const getChat = async (req, res) => {
  try {
    const { username, userid, id } = req.body;

    if (!userid) {
      res.send("Invalid/Empty USERID");
      return;
    }

    if (username) {
      const userresponse = await User.findOne({ username }).select("_id");

      if (!userresponse) {
        res.send("Username is invalid");
        return;
      }
      const conv = await Conversation.findOne({
        $and: [{ users: userid }, { users: userresponse._id }],
      });

      if (conv) {
        res.send({
          success: true,
          conversationID: conv._id,
          users: [userid, userresponse._id],
        });
      } else {
        const convCreate = await Conversation.create({
          users: [userid, userresponse._id],
        });

        res.send({
          success: true,
          conversationID: convCreate._id,
        });
      }
    } else {
      let conv = await Conversation.findById(id)
        .populate({ path: "messages" })
        .populate({ path: "users" });
      conv.users.map((user) => {
        user.password = null;
        user._id = null;
        user.dob = null;
        user.email = null;
      });

      res.send({
        success: true,
        chat: conv,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteMessage = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const sendMessage = async (req, res) => {
  try {
    console.log(req.body);
    const msgCreate = await Message.create({
      sender: req.body.sender,
      msg: req.body.msg,
    });

    await Conversation.findByIdAndUpdate(req.body?.chatID, {
      $push: { messages: msgCreate._id },
      lastMessage: msgCreate,
    });
    res.send({
      success: true,
      message: msgCreate,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendMessage, getConversations, getChat, deleteMessage };

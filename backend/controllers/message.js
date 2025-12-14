import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { ApiError } from "../utility/apiError.js";
import { Conversation } from "../models/conversation.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";

const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user._id;

  const { conversationId, receiverId, message } = req.body;
  console.log(req.body);

  if (!message || (!conversationId && !receiverId)) {
    throw new ApiError(
      400,
      "Message and a valid target (conversationId or receiverId) are required"
    );
  }

  let conversation;

  if (conversationId) {
    conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new ApiError(404, "Conversation not found");
    }
  } else {
    if (!receiverId) {
      throw new ApiError(400, "conversationId and receiverId is missing");
    }
    conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }
  }

  const newMessageData = {
    conversationId: conversation._id,
    senderId,
    message: message || "",
  };

  const newMessage = await Message.create(newMessageData);
  newMessage.populate("senderId", "fullName userName avatar");
  conversation.messages.push(newMessage._id);
  await conversation.save();
  // socket.io to implement
  return res
    .status(201)
    .json(new ApiResponse(200, newMessage, "Message sent successfully"));
});

// get the message based on a recieverId from the frontend
const getMessage = asyncHandler(async (req, res) => {
  const senderId = req.user._id;

  const { receiverId } = req.query;

  // 1. Validating
  if (senderId && !receiverId) {
    throw new ApiError(400, "receiverId is required");
  }

  // 2. Find the conversation
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  // 3.In case of no conversation
  if (!conversation) {
    return res.status(200).json(200, [], "No messages");
  }

  // 4. Fetch all messages for that conversation
  const messages = await Message.find({ conversationId: conversation._id })
    .populate("senderId", "fullName userName avatar")
    .sort({ createdAt: 1 });
  // 5. Return the messages
  return res
    .status(201)
    .json(new ApiResponse(200, messages, "message fetched successfully"));
});

export { sendMessage, getMessage };

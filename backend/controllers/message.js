import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { ApiError } from "../utility/apiError.js";
import { Conversation } from "../models/conversation.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";

const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  const { conversationId, receiverId, message } = req.body;
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
  conversation.messages.push(newMessage._id);
  await conversation.save();

  return res
    .status(201)
    .json(new ApiResponse(200, newMessage, "Message sent successfully"));
});
const getOtherUsers = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;
  const users = await User.find({
    _id: { $ne: currentUserId },
  }).select("-password -refreshToken");

  return res
    .status(201)
    .json(new ApiResponse(200, users, "users fetched successfully"));
});
export { sendMessage, getOtherUsers };

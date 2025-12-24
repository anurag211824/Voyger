import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    attachments: [
      {
        url: { type: String },
        type: {
          type: String,
          enum: ["image", "video", "audio"],
        },
      },
    ],
  },
  { timestamps: true }
);

export const Message =  mongoose.model("Message", messageSchema);

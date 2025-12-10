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

    // Text message
    message: {
      type: String,
      default: "",
    },

    // Media attachments
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

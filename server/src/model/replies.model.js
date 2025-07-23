import mongoose from "mongoose";

const commentReplySchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      likes: {
        userIds: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
        count: {
          type: Number,
          default: 0,
        },
      },
      commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
      },
    },
    {
      timestamps: true,
      toJSON: {
        transform(_doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        },
      },
    }
  );

  const ReplyModel = mongoose.model("Reply", commentReplySchema, "replies");

  export default ReplyModel;
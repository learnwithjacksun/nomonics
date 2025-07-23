import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
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
      episodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episode",
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

  const CommentModel = mongoose.model("Comment", commentSchema, "comments");

  export default CommentModel;
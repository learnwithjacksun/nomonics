import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
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

const singleComicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
      required: true,
    },
    pdfId: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
    ratings: {
      type: [
        {
          userId: { type: Schema.Types.ObjectId, ref: "User" },
          rating: { type: Number, required: true },
        },
      ],
      default: [],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.ratings;
      },
    },
  }
);

const SingleComicModel = model("SingleComic", singleComicSchema);

export default SingleComicModel;

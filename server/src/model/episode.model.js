import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
    {
      comicId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      episodeNumber: {
        type: Number,
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
      coverImageId: {
        type: String,
      },
      pdf: {
        type: String,
        required: true,
      },
      pdfId: {
        type: String,
        required: true,
      },
      likes: {
        userIds: [ String ],
        count: {
          type: Number, 
          default: 0,
        },
      },
      dislikes: {
        userIds: [ String ],
        count: {
          type: Number,
          default: 0,
        },
      },
      views: {
        ipAddresses: [ String ],
        count: {
          type: Number,
          default: 0,
        },
      }
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

export const EpisodeModel = mongoose.model("Episode", episodeSchema, "episodes");

export default EpisodeModel;
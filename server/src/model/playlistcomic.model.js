import { Schema, model } from "mongoose";

const playlistComicSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    episodes: {
        type: [Schema.Types.ObjectId],
        ref: "SingleComic",
        default: [],
    },
    creator: {
        type: Schema.Types.ObjectId,
    }
}, {
    timestamps: true,
    toJSON: {
        transform(_doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
})

const PlaylistComicModel = model("PlaylistComic", playlistComicSchema);

export default PlaylistComicModel;
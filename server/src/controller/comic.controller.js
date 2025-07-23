import CommentModel from "../model/comments.model.js";
import EpisodeModel from "../model/episode.model.js";
import ReplyModel from "../model/replies.model.js";
import ComicModel from "../model/comic.model.js";

const onError = (res, error) => {
  console.log(error);
  res.status(500).json({
    success: false,
    message: error.message,
  });
};

export const createNewComic = async (req, res) => {
  const {
    title,
    description,
    coverImage,
    imageId,
    pdf,
    pdfId,
    categories,
    creatorId,
  } = req.body;

  if (
    !title ||
    !description ||
    !coverImage ||
    !pdf ||
    !categories ||
    !pdfId
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const comic = await ComicModel.create({
      title,
      coverImage,
      creator: creatorId,
      coverImageId: imageId,
    });

    if (!comic) {
      return res.status(400).json({
        success: false,
        message: "Comic creation failed",
      });
    }

    const episodes = await EpisodeModel.find({ comicId: comic._id });

    await EpisodeModel.create({
      title: `Episode ${episodes.length + 1}`,
      episodeNumber: episodes.length + 1,
      description,
      coverImage,
      coverImageId: imageId,
      pdf,
      pdfId,
      comicId: comic._id,
    });

    res.status(201).json({
      success: true,
      message: "Comic created successfully",
      comic,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getComics = async (req, res) => {
  try {
    const comics = await ComicModel.find()
      .populate("creator", "id name email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Comics fetched successfully",
      comics,
    });
  } catch (error) {
    onError(res, error);
  }
};
export const getEpisodesByComicId = async (req, res) => {
  const { comicId } = req.params;
  try {
    const episodes = await EpisodeModel.find({ comicId: comicId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Episodes fetched successfully",
      episodes,
    });
  } catch (error) {
    onError(res, error);
  }
};
export const getCommentsByEpisodeId = async (req, res) => {
  const { episodeId } = req.params;
  try {
    const comments = await CommentModel.find({ episodeId })
      .populate("user", "id name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    onError(res, error);
  }
};
export const getRepliesByCommentId = async (req, res) => {
  const { commentId } = req.params;
  try {
    const replies = await ReplyModel.find({ commentId })
      .populate("user", "id name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Replies fetched successfully",
      replies,
    });
  } catch (error) {
    onError(res, error);
  }
};

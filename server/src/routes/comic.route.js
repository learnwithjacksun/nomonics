import express from "express";
import { createNewComic, getComics, getEpisodesByComicId, getCommentsByEpisodeId, getRepliesByCommentId } from "../controller/comic.controller.js";

const comicRouter = express.Router();

comicRouter.post("/create/new", createNewComic);
comicRouter.get("/all", getComics);
comicRouter.get("/episodes/:comicId", getEpisodesByComicId);
comicRouter.get("/comments/:episodeId", getCommentsByEpisodeId);
comicRouter.get("/replies/:commentId", getRepliesByCommentId);


export default comicRouter;
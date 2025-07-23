import { Router } from "express";
import { createSingleComic, getCreatorSingleComics, getAllSingleComics } from "../controller/comic.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const singleComicRouter = Router();

singleComicRouter.post("/create", isAuthenticated, createSingleComic);
singleComicRouter.get("/creator", isAuthenticated, getCreatorSingleComics);
singleComicRouter.get("/all", getAllSingleComics);

export default singleComicRouter;
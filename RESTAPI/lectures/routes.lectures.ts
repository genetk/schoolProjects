import express from "express";

import { delete_lecture, get_lectures, post_lectures, put_lecture } from "./controller.lectures";

const lecturesRouter = express.Router({ mergeParams: true });

lecturesRouter.post("/", express.json(), post_lectures);
lecturesRouter.get("/", get_lectures);
lecturesRouter.put("/:lecture_id", express.json(), put_lecture);
lecturesRouter.delete("/:lecture_id", delete_lecture);

export default lecturesRouter;
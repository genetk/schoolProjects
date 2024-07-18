import express from "express";

import { post_courses, get_courses, get_course, delete_course, put_course } from "./controller.courses";
import lecturesRouter from "../lectures/routes.lectures";

const coursesRouter = express.Router();

coursesRouter.post("/", express.json(), post_courses);
coursesRouter.get("/", get_courses);
coursesRouter.get("/:course_id", get_course);
coursesRouter.delete("/:course_id", delete_course);
coursesRouter.put("/:course_id", express.json(), put_course);

coursesRouter.use("/:course_id/lectures", lecturesRouter);

export default coursesRouter;
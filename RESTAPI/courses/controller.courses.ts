import { RequestHandler } from "express";

import { Course, CourseModel } from "./model.courses";
import { StandardResponse } from "../types/response.types";
import { JWTContent } from "../types/jwtTypes";

export const post_courses: RequestHandler<unknown, StandardResponse<Course>, { title: string; description: string; }, unknown> = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { user_id, email, fullname } = req.tokenInfo as JWTContent;
    const results = await CourseModel.create({
      title, description, created_by: { user_id, fullname: `${fullname.first} ${fullname.last}`, email }
    });
    res.json({ success: true, data: results });

  } catch (error) {
    next(error);
  }
};

export const get_courses: RequestHandler<unknown, unknown, unknown, { action: string, page: string; }> = async (req, res, next) => {
  try {
    const { action, page } = req.query;
    const { user_id } = req.tokenInfo;
    if (action === "all") {
      const results = await CourseModel.paginate({}, { page: +page, limit: 1, projection: { title: 1, description: 1 } });
      res.json(results);

    } else if (action === 'own') {
      const results = await CourseModel.paginate({ "created_by.user_id": user_id }, { page: +page, limit: 1, projection: { "title.$": 1, "description": 1 } });
      res.json(results);

    } else {
      throw new Error("Action Undefined");
    }

  } catch (error) {
    next(error);
  }
};

export const get_course: RequestHandler<{ course_id: string; }, StandardResponse<Course | null>, unknown, unknown> = async (req, res, next) => {
  try {
    const { course_id } = req.params;
    const { user_id } = req.tokenInfo;
    const results = await CourseModel.findOne({ _id: course_id, 'created_by.user_id': user_id }, { "title.$": 1, "description": 1 });
    res.json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

export const delete_course: RequestHandler<{ course_id: string; }, StandardResponse<number>, unknown, unknown> = async (req, res, next) => {
  try {
    const { course_id } = req.params;
    const { user_id } = req.tokenInfo;
    const results = await CourseModel.deleteOne({ _id: course_id, 'created_by.user_id': user_id });
    res.json({ success: true, data: results.deletedCount });

  } catch (error) {
    next(error);
  }
};

export const put_course: RequestHandler<{ course_id: string; }, StandardResponse<number>, { title: string; description: string; }, unknown> = async (req, res, next) => {
  try {
    const { course_id } = req.params;
    const { user_id } = req.tokenInfo;
    const { title, description } = req.body;
    const results = await CourseModel.updateOne({ _id: course_id, 'created_by.user_id': user_id }, { $set: {title, description} });
    res.json({ success: true, data: results.modifiedCount });

  } catch (error) {
    next(error);
  }
};

import { RequestHandler } from "express";

import { Lecture } from "../lectures/schema.lectures";
import { StandardResponse } from "../types/response.types";
import { CourseModel } from "../courses/model.courses";

export const post_lectures: RequestHandler<{ course_id: string; }, StandardResponse<number>, Lecture, unknown> = async (req, res, next) => {
  try {
    const { user_id } = req.tokenInfo;
    const { course_id } = req.params;
    const results = await CourseModel.updateOne(
      { _id: course_id, "created_by.user_id": user_id }, { $addToSet: { lectures: req.body } }
    );
    res.json({ success: true, data: results.modifiedCount });
  } catch (error) {
    next(error);
  }
};

export const get_lectures: RequestHandler<{ course_id: string; }, StandardResponse<Lecture[]>, unknown, unknown> = async (req, res, next) => {
  try {
    const { course_id } = req.params;
    const { user_id } = req.tokenInfo;
    const results = await CourseModel.findOne(
      { _id: course_id, "created_by.user_id": user_id }, { lectures: 1 }
    );
    res.json({
      success: true,
      data: results?.lectures || ([] as Lecture[]),
    });
  } catch (error) {
    next(error);
  }
};

export const put_lecture: RequestHandler<{ course_id: string, lecture_id: string; }, StandardResponse<number>, Lecture, unknown> = async (req, res, next) => {
  try {
    const { user_id } = req.tokenInfo;
    const { course_id, lecture_id } = req.params;
    const results = await CourseModel.updateOne(
      { _id: course_id, "created_by.user_id": user_id, 'lectures._id': lecture_id }, { $set: { "lectures.$": req.body } }
    );
    res.json({ success: true, data: results.modifiedCount });

  } catch (error) {
    next(error);
  }
};

export const delete_lecture: RequestHandler<{ course_id: string; lecture_id: string; }, StandardResponse<number>, unknown, unknown> = async (req, res, next) => {
  try {
    const { course_id, lecture_id } = req.params;
    const { user_id } = req.tokenInfo;
    const results = await CourseModel.updateOne(
      { _id: course_id, "created_by.user_id": user_id }, { $pull: { lectures: { _id: lecture_id } } }
    );
    res.json({ success: true, data: results.modifiedCount });

  } catch (error) {
    next(error);
  }
};

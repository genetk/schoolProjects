import mongoose, { Schema, InferSchemaType, model } from "mongoose";
import paginate from 'mongoose-paginate-v2';

import { LectureSchema } from "../lectures/schema.lectures";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_by: {
      user_id: Schema.Types.ObjectId,
      fullname: String,
      email: String,
    },
    lectures: [ LectureSchema ],
  },
  { timestamps: true, versionKey: false }
);


CourseSchema.plugin(paginate);
export type Course = InferSchemaType<typeof CourseSchema>;

interface CourseDocument extends mongoose.Document, Course { };

export const CourseModel = model<CourseDocument,
  mongoose.PaginateModel<CourseDocument>>("course", CourseSchema);


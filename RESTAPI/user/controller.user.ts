import express, { RequestHandler } from "express";

import { GUEST_PICTURE, UserModel } from "./model.user";
import { StandardResponse } from "../types/response.types";
import { count } from "node:console";

export const resetRouter = express.Router;

export const post_picture: RequestHandler<{ user_id: string; }, StandardResponse<number>, unknown, unknown> = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    if (user_id !== req.tokenInfo.user_id) {
      throw new Error("No match found between JWT user_id and requested user_id");
    }
    const results = await UserModel.updateOne(
      { _id: user_id, active: true },
      { $set: { picture: req.file } }
    );
    res.json({ success: true, data: results.modifiedCount });

  } catch (error) {
    next(error);
  }
};

export const delete_picture: RequestHandler<{ user_id: string, }, StandardResponse<number>, unknown, unknown> = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    if (user_id !== req.tokenInfo.user_id) {
      throw new Error("No match found between JWT user_id and requested user_id");
    }
    const results = await UserModel.updateOne(
      { _id: user_id, active: true },
      { $set: { picture: GUEST_PICTURE } }
    );
   
    res.json({ success: true, data: results.modifiedCount });

  } catch (error) {
    next(error);
  }
};

export const patch_picture: RequestHandler<{ user_id: string; }, StandardResponse<number>, unknown, { active: false; }> = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const query_string = req.query;
    const update_query: { [ key: string ]: { active: boolean; }; } = {};
    if (query_string) {
      update_query[ '$set' ] = query_string;
    } else {
      update_query;
    }
    if (user_id !== req.tokenInfo.user_id) {
      throw new Error("No match found between JWT user_id and requested user_id");
    }
    const results = await UserModel.updateOne(
      { _id: user_id, active: true }, update_query
    );

    res.json({ success: true, data: results.modifiedCount });

  } catch (error) {
    next(error);
  }
};

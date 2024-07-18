import e, { RequestHandler } from "express";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { User, UserModel } from "../user/model.user";
import { StandardResponse } from "../types/response.types";

export const sign_in: RequestHandler<unknown, StandardResponse<string>, User, unknown> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user_DB = await UserModel.findOne({ email });

    if (!user_DB) {
      throw new Error("User doesnot exist");
    }

    const match_password = await compare(password, user_DB.password);
    if (!match_password) throw new Error("Password not matched");

    if (!process.env.Private_Key) {
      throw new Error("Private key not found");

    } else {
      const { _id, fullname, email } = user_DB;
      const profile_picture_path = user_DB.picture.path;

      const token = sign(
        { user_id: _id, email, fullname, profile_picture_path },
        process.env.Private_Key
      );
      res.json({ success: true, data: token });

    }

  } catch (error) {
    next(error);
  }
};

import { RequestHandler } from "express";
import { hash } from 'bcrypt';

import { StandardResponse } from "../types/response.types";
import { User, UserModel } from "../user/model.user";

export const sign_up: RequestHandler<unknown, StandardResponse<User>, User, unknown> = async (req, res, next) => {
    try {
        const saltRounds = 10;

        const hashed_password = await hash(req.body.password, saltRounds);
        const { fullname, email } = req.body;

        const user_DB = await UserModel.create({
            "fullname": fullname, "email": email, "password": hashed_password
        });

        res.json({ success: true, data: user_DB });
      

    } catch (error) {
        next(error);
    }

};
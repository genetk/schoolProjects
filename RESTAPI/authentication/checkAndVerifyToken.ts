import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";


export const checkAndVerifyToken: RequestHandler<unknown, unknown, unknown, unknown> = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[ 1 ];
        if (!token) {
            res.json({ message: "You are not authorized" });
        } else {
            const result = verify(token, `${process.env.Private_Key}`);
            if (!result) {
                throw new Error("Unable to verify");
            } else {
                req.tokenInfo = result;
                next();
            }
        }

    } catch (error) {
        next(error);
    }

};

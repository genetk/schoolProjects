import express from "express";
import multer from 'multer';

import { sign_up } from '../login/sign_up';
import { sign_in } from '../login/sign_in';
import { checkAndVerifyToken } from '../authentication/checkAndVerifyToken';
import { delete_picture, patch_picture, post_picture } from './controller.user';

export const usersRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

usersRouter.post('/signup', express.json(), sign_up);
usersRouter.post("/signin", express.json(), sign_in);
usersRouter.post("/:user_id/picture", checkAndVerifyToken, upload.single('myfile'), post_picture);
usersRouter.delete("/:user_id/picture", checkAndVerifyToken, delete_picture);
usersRouter.patch("/:user_id", checkAndVerifyToken, patch_picture);

import { Router } from "express";
import { randomUUID } from "crypto";

import { comments } from "../datas";

import { checkPostExists } from "../middlewares/checkPostExists";
import { identifyUser } from "../middlewares/identifyUser";
import { validateCommentBody } from "../middlewares/validateCommentBody";
import { checkCommentOwnership } from "../middlewares/checkCommentOwnership";

import type { UserRequest } from "../types";

const router = Router();

router.get("/", checkPostExists, (req, res) => {
  const postComments = comments.filter(
    (comment) => comment.postId === req.params.postId,
  );

  res.json(postComments);
});

router.post(
  "/",
  checkPostExists,
  identifyUser,
  validateCommentBody,
  (req: UserRequest, res) => {
    const postId = req.params.postId;

    if (typeof postId !== "string") {
      return res.status(400).json({
        message: "postId inválido",
      });
    }

    const newComment = {
      id: randomUUID(),
      postId,
      userId: req.userId!,
      text: req.body.text,
    };

    comments.push(newComment);

    res.status(201).json(newComment);
  },
);

router.delete(
  "/:commentId",
  checkPostExists,
  identifyUser,
  checkCommentOwnership,
  (req: UserRequest, res) => {
    const index = comments.findIndex(
      (comment) => comment.id === req.params.commentId,
    );

    comments.splice(index, 1);

    res.status(204).send();
  },
);

export default router;

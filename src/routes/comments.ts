import { Router } from "express";
import { randomUUID } from "crypto";

import { comments } from "../datas";

import { checkPostExists } from "../middlewares/checkPostExists";
import { identifyUser } from "../middlewares/identifyUser";
import { validateCommentBody } from "../middlewares/validateCommentBody";
import { checkCommentOwnership } from "../middlewares/checkCommentOwnership";

import type { UserRequest } from "../types";

interface PostParams {
  postId: string;
}

interface CommentParams extends PostParams {
  commentId: string;
}

interface CommentBody {
  text: string;
}

const router = Router();

router.get<PostParams>("/", checkPostExists, (req, res) => {
  const postComments = comments.filter(
    (comment) => comment.postId === req.params.postId,
  );

  res.json(postComments);
});

router.post<PostParams, object, CommentBody>(
  "/",
  checkPostExists,
  identifyUser,
  validateCommentBody,
  (req: UserRequest<PostParams>, res) => {
    const newComment = {
      id: randomUUID(),
      postId: req.params.postId,
      userId: req.userId!,
      text: req.body.text,
    };

    comments.push(newComment);

    res.status(201).json(newComment);
  },
);

router.delete<CommentParams>(
  "/:commentId",
  checkPostExists,
  identifyUser,
  checkCommentOwnership,
  (req: UserRequest<CommentParams>, res) => {
    const index = comments.findIndex(
      (comment) => comment.id === req.params.commentId,
    );

    comments.splice(index, 1);

    res.status(204).send();
  },
);

export default router;

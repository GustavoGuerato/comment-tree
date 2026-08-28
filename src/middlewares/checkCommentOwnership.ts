import type { Response, NextFunction } from "express";

import type { UserRequest } from "../types";

import { comments } from "../datas";

export function checkCommentOwnership(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const comment = comments.find(
    (comment) => comment.id === req.params.commentId,
  );

  if (!comment) {
    return res.status(404).json({
      message: "Comentário não encontrado",
    });
  }

  if (comment.userId !== req.userId) {
    return res.status(403).json({
      message: "Você não é o dono deste comentário",
    });
  }

  next();
}

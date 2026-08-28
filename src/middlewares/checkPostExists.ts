import type { Request, Response, NextFunction } from "express";

import { posts } from "../datas";

export function checkPostExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const post = posts.find((post) => post.id === req.params.postId);

  if (!post) {
    return res.status(404).json({
      message: "Post não encontrado",
    });
  }

  next();
}

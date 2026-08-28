import type { Request, Response, NextFunction } from "express";

export function validateCommentBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.body.text || typeof req.body.text !== "string") {
    return res.status(400).json({
      message: "text deve ser uma string",
    });
  }

  if (req.body.text.length < 1 || req.body.text.length > 280) {
    return res.status(400).json({
      message: "text deve ter entre 1 e 280 caracteres",
    });
  }

  next();
}

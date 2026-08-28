import type { Response, NextFunction } from "express";

import type { UserRequest } from "../types";

export function identifyUser(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const userId = req.headers["x-user-id"];

  if (typeof userId !== "string") {
    return res.status(401).json({
      message: "Usuário não identificado",
    });
  }

  req.userId = userId;

  next();
}

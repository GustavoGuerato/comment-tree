import type { Request } from "express";

export interface Post {
  id: string;
  title: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  text: string;
}

export interface UserRequest extends Request {
  userId?: string;
}

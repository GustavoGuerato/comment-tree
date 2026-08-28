import express from "express";

import commentsRouter from "./routes/comments";

const app = express();

app.use(express.json());

app.use("/posts/:postId/comments", commentsRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

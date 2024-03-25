import { Router } from "express";
import { TasksController } from "../controller/tasks.js";

export const createTaskRoutes = ({ tasksModel }) => {
  const router = Router();
  const controller = new TasksController({ tasksModel: tasksModel });
  router.get("/", controller.getAll);
  router.post("/", controller.create);
  router.patch("/:id", controller.update);
  router.delete("/:id", controller.delete);
  return router;
};

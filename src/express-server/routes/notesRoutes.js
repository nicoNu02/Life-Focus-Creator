import { Router } from "express";
import { NotesController } from "../controller/notes.js";

export const createNotesRoutes = ({ notesModel }) => {
  const router = Router();

  const controller = new NotesController({ notesModel });

  router.get("/", controller.getAll);
  router.post("/", controller.addNote);
  router.patch("/", controller.updateNote);

  return router;
};

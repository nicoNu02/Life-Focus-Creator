import express, { json } from "express";
import cors from "cors";
import { createTaskRoutes } from "./routes/tasksRoutes.js";
import { TasksModel } from "./models/tasks.js";
import { createNotesRoutes } from "./routes/notesRoutes.js";
import { NotesModel } from "./models/notes.js";
const app = express();
const port = 4000;
app.use(json());
app.use(cors());
app.disable("x-powered-by");

app.use("/tasks", createTaskRoutes({ tasksModel: TasksModel }));
app.use("/notes", createNotesRoutes({ notesModel: NotesModel }));

app.listen(port, () => {
  console.log("server listening on http://localhost:4000/tasks");
});

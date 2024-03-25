import { validateNote, validatePartialNote } from "../schemas/notes.js";

export class NotesController {
  constructor({ notesModel }) {
    this.notesModel = notesModel;
  }

  getAll = async (req, res) => {
    const response = await this.notesModel.getAll();
    console.log("request");
    res.json(response);
  };

  addNote = async (req, res) => {
    const result = validatePartialNote(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const response = await this.notesModel.addNote({ note: result.data });
    res.json(response);
  };

  updateNote = async (req, res) => {
    const result = validatePartialNote(req.body);
    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error) });

    const response = await this.notesModel.updateNote({ note: result.data });
    res.json(response);
  };
}

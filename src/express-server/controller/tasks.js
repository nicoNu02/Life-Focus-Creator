import { validateTask, validatePartialTask } from "../schemas/tasks.js";

export class TasksController {
  constructor({ tasksModel }) {
    this.tasksModel = tasksModel;
  }

  getAll = async (req, res) => {
    const tasks = await this.tasksModel.getAll();
    console.log("request");
    res.json(tasks);
  };

  create = async (req, res) => {
    const result = validateTask(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const task = await this.tasksModel.create({ input: result.data });
    res.json(task);
  };

  update = async (req, res) => {
    const result = validatePartialTask(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const { id } = req.params;

    const updatedtask = await this.tasksModel.update({
      id,
      input: result.data,
    });
    res.json(updatedtask);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deletedtask = await this.tasksModel.delete({ id });
    res.json({ message: "task deleted" });
  };
}
